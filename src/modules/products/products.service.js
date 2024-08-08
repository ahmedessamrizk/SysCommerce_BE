import { productModel } from '../../../DB/models/product.model.js';
import * as categoriesService from '../categories/categories.service.js';
import { paginate } from '../../utils/pagination.js';
import { roles } from '../../middleware/auth.js';

export const createProduct = async (product, currUser) => {
  //check category exist
  const checkCategory = await categoriesService.checkValidCategory({
    _id: product.category
  });
  if (!checkCategory.status) {
    throw new Error(checkCategory.message, { cause: checkCategory.cause });
  }

  product.createdBy = currUser._id;

  return await productModel.create(product);
};

export const getProducts = async query => {
  const send_query = {};

  if (query.category) {
    //check category exist
    const checkCategory = await categoriesService.checkValidCategory({
      slug: query.category
    });
    if (!checkCategory.status) {
      throw new Error(checkCategory.message, { cause: checkCategory.cause });
    }
    send_query.category = checkCategory._id;
  }

  const { limit, skip } = paginate(query.page, query.size);
  const [products, totalProducts] = await Promise.all([
    productModel
      .find(send_query)
      .limit(limit)
      .skip(skip)
      .populate([
        { path: 'category', select: 'name slug' },
        { path: 'createdBy', select: 'userName email' }
      ]),
    productModel.countDocuments()
  ]);

  // Calculate the number of pages available
  const totalPages = Math.ceil(totalProducts / limit);
  return { total: products.length, totalPages, products };
};

export const updateProduct = async (id, product, currUser) => {
  //check the product exist and created by the current user
  const checkProduct = await checkProductOwnership(id, currUser);
  if (!checkProduct.status) {
    throw new Error(checkProduct.message, { cause: checkProduct.cause });
  }

  //check category exist
  const checkCategory = await categoriesService.checkValidCategory({
    _id: product.category
  });
  if (!checkCategory.status) {
    throw new Error(checkCategory.message, { cause: checkCategory.cause });
  }

  return await productModel.findByIdAndUpdate(id, product, { new: true });
};

export const deleteProduct = async (id, currUser) => {
  //check the product exist and created by the current user
  if (currUser.role === roles.User) {
    const checkProduct = await checkProductOwnership(id, currUser);
    if (!checkProduct.status) {
      throw new Error(checkProduct.message, { cause: checkProduct.cause });
    }
  }

  const deletedProduct = await productModel.findByIdAndDelete(id);
  if (!deletedProduct) {
    throw new Error('product not found', { cause: 404 });
  }
};

export const checkValidProduct = async query => {
  const productExist = await getProduct(query);
  if (!productExist) {
    return {
      status: false,
      message: 'product not found',
      cause: 404
    };
  }
  return { status: true };
};

export const getProduct = async query => {
  return await productModel.findOne(query);
};

const checkProductOwnership = async (id, currUser) => {
  const productExist = await getProduct({
    _id: id,
    createdBy: currUser._id
  });
  if (!productExist) {
    return {
      status: false,
      message: 'product not found or you arent authorized',
      cause: 400
    };
  }
  return { status: true };
};

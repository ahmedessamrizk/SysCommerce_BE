import slugify from 'slugify';
import { categoryModel } from '../../../DB/models/category.model.js';
import { paginate } from '../../utils/pagination.js';
import * as productsService from '../products/products.service.js';

const privateData = '-createdBy -__v -type';

export const getCategory = async query => {
  return await categoryModel.findOne(query);
};

export const create = async (category, currUser) => {
  //slug the name
  category.slug = slugify(category.name.toLowerCase());

  //check if category already exists
  if (await getCategory({ slug: category.slug })) {
    throw new Error('category already exists', { cause: 409 });
  }

  //handle subcategory type
  if (category.parentCategory) {
    //check if parent category exists
    const parentCategory = await getCategory({
      _id: category.parentCategory
    });
    if (!parentCategory) {
      throw new Error('parent category not found', { cause: 404 });
    }

    //subcategory type is more than direct parent type by 1
    category.type = parentCategory.type + 1;
  }

  category.createdBy = currUser._id;
  return await categoryModel.create(category);
};

export const getCategories = async query => {
  const { limit, skip } = paginate(query.page, query.size);

  const [categories, totalCategories] = await Promise.all([
    categoryModel
      .find({ type: 0 })
      .limit(limit)
      .skip(skip)
      .select(privateData),
    categoryModel.countDocuments({ type: 0 })
  ]);

  // Calculate the number of pages available
  const totalPages = Math.ceil(totalCategories / limit);

  const formatedCategories = await reformatCategories(categories);
  return {
    total: totalCategories,
    totalPages,
    categories: formatedCategories
  };
};

export const updateCategory = async (id, category) => {
  category.slug = slugify(category.name.toLowerCase());

  const updatedCategory = await categoryModel.findByIdAndUpdate(id, category, {
    new: true
  });

  if (!updatedCategory) {
    throw new Error('category not found', { cause: 404 });
  }
  return updatedCategory;
};

export const deleteCategory = async id => {
  const subCategories = await getCategory({ parentCategory: id });

  //check if category doesn't have subcategories
  if (subCategories) {
    throw new Error('Category has subcategories and cannot be deleted.', {
      cause: 400
    });
  }

  //check if category is used in at least one product
  const product = await productsService.getProduct({ category: id });
  if (product) {
    throw new Error('Category has products and cannot be deleted.', {
      cause: 400
    });
  }

  const deletedCategory = await categoryModel.findByIdAndDelete(id);

  if (!deletedCategory) {
    throw new Error('category not found', { cause: 404 });
  }
};

export const checkValidCategory = async query => {
  let category;
  if (query) {
    category = await getCategory(query);
    if (!category) {
      return { status: false, message: 'category not found', cause: 404 };
    }
  }
  return { status: true, _id: category._id };
};

const getAllCategories = async query => {
  return await categoryModel.find(query).select(privateData);
};

const reformatCategories = async paginatedCategories => {
  //get all subcategories
  const categories = await getAllCategories({
    type: { $in: [1, 2] }
  });

  //add paginated root categories to the subcategories
  categories.push(...paginatedCategories);

  // Create a map of categories by their ID where key is the category ID and value is the category object
  const categoryMap = {};
  categories.forEach(category => {
    categoryMap[category._id] = { ...category.toObject(), subCategories: [] };
  });

  // Intialize array for reformated categories
  const result = [];

  // Iterate over categories and add subcategories to their parent category
  categories.forEach(category => {
    if (category.parentCategory) {
      const parent = categoryMap[category.parentCategory];
      if (parent) {
        delete categoryMap[category._id].parentCategory;
        parent.subCategories.push(categoryMap[category._id]);
      }
    } else {
      result.push(categoryMap[category._id]);
    }
  });

  return result;
};

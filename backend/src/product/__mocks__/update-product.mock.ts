import { categoryMock } from '../../category/__mocks__/category.mock';
import { UpdateProductDTO } from '../dtos/update-product.dto';

export const updateProductMock: UpdateProductDTO = {
    categoryId: categoryMock.id,
    image: 'lkfdjsafkldsa',
    name: 'update mock product',
    price: 25.0,
};
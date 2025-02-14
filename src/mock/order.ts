import { HttpResponse, http } from 'msw'
import { fakerKO as faker } from '@faker-js/faker'
import { Cart } from '@/models/cart.model'
import { ROUTES } from '@/constants/routes';
import { BASE_URL } from '@/api/http';
import { OrderDetailItem, Order } from '@/models/order.model';

const generateMockCartItem = (id: number): Cart => ({
    id,
    bookId: faker.number.int({ min: 1, max: 100 }),
    title: faker.commerce.productName(),
    summary: faker.commerce.productDescription(),
    quantity: faker.number.int({ min: 1, max: 5 }),
    price: faker.number.int({ min: 10000, max: 50000 })
});

const generateMockOrderDetailItem = (bookId: number): OrderDetailItem => ({
    bookId,
    title: faker.commerce.productName(),
    author: faker.person.fullName(),
    price: faker.number.int({ min: 10000, max: 50000 }),
    quantity: faker.number.int({ min: 1, max: 5 })
});


const generateMockOrder = (): Order => ({
    id: faker.number.int({ min: 1, max: 1000 }),
    createdAt: faker.date.recent().toISOString(),
    address: faker.location.streetAddress(),
    receiver: faker.person.fullName(),
    contact: faker.phone.number(),
    bookTitle: faker.commerce.productName(),
    totalQuantity: faker.number.int({ min: 1, max: 5 }),
    totalPrice: faker.number.int({ min: 10000, max: 200000 })
});

// 장바구니 조회
export const cartGet = http.get(`${BASE_URL}${ROUTES.CART}`, () => {
    const items = Array.from({ length: faker.number.int({ min: 1, max: 5 }) })
        .map((_, index) => generateMockCartItem(index + 1))

    return HttpResponse.json(items)
});

// 장바구니 담기
export const cartPost = http.post(`${BASE_URL}${ROUTES.CART}`, async () => {
    return HttpResponse.json(
        { message: '장바구니에 추가되었습니다.' }
    )
});

// 장바구니 삭제
export const cartDelete = http.delete(`${BASE_URL}${ROUTES.CART}/:cartId`, () => {
    return HttpResponse.json(
        { message: '장바구니에서 삭제되었습니다.' }
    )
});

// 주문생성 
export const orderPost = http.post(`${BASE_URL}${ROUTES.ORDER}`, async () => {
    const orderId = `ORDER_${faker.string.alphanumeric(8)}`
    return HttpResponse.json(
        {
            orderId,
            message: '주문이 완료되었습니다.'
        },
        { status: 201 }
    )
});

// 주문 내역 조회
export const orderGet = http.get(`${BASE_URL}${ROUTES.ORDER}`, () => {
    const orders = Array.from({ length: faker.number.int({ min: 3, max: 5 }) })
        .map(() => ({
            ...generateMockOrder(),
            detail: Array.from({ length: faker.number.int({ min: 1, max: 3 }) })
                .map(() => generateMockOrderDetailItem(faker.number.int({ min: 1, max: 100 })))
        }))

    return HttpResponse.json(orders)
});

// 주문 상세 조회
export const orderGetById = http.get(`${BASE_URL}${ROUTES.ORDER}/:orderId`, () => {
    const details = Array.from({ length: faker.number.int({ min: 1, max: 3 }) })
        .map(() => generateMockOrderDetailItem(faker.number.int({ min: 1, max: 100 })))

    return HttpResponse.json(details)
});

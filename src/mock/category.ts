import { Category } from "@/models/category.model";
import { HttpResponse, http } from "msw";
import { fakerKO as faker } from "@faker-js/faker";
import { ROUTES } from "../constants/routes";
import { BASE_URL } from '../api/http';

const categoriesData: Category[] = Array.from({ length: 4 }).map((_, index) => ({
    id: index,
    name: faker.commerce.department(),
}));

export const categories = http.get(`${BASE_URL}${ROUTES.CATEGORY}`, () => {
    console.log("[MSW] Intercepted category request");  // 디버깅용 로그
    return HttpResponse.json(categoriesData);
});

import { Category } from "../models/category.model";
import { httpClient } from "./http";
import { ROUTES } from "../constants/routes";

export const fetchCategory = async () => {
    const response = await httpClient.get<Category[]>(ROUTES.CATEGORY);

    return response.data;
};
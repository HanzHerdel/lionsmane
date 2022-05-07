import axios from "axios";
import { IRazas } from "../../domain/interfaces";

// A mock function to mimic making an async request for data
export const fetchRazes = async (): Promise<{
  message: IRazas;
  status: string;
}> => {
  try {
    const response = await axios.get("https://dog.ceo/api/breeds/list/all");
    return response.data;
    //return response
  } catch (err: any) {
    return err;
  }
};

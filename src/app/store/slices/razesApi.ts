import axios from "axios";
import { IRazas, DinamicObject } from '../../domain/interfaces';

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

export const fetchPictures = async (urlsObj:DinamicObject): Promise<DinamicObject> => {
  try {
    const mappedUrls = {...urlsObj}
    const keys=Object.keys(urlsObj)
    await Promise.all(keys.map(async (key)=>{
      const res=await axios.get(urlsObj[key])
      mappedUrls[key]=res.data.message
    }));
    return mappedUrls;
    //return response
  } catch (err: any) {
    return err;
  }
};

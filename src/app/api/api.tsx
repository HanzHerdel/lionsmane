import axios from "axios";
export const getRandomSubRacePics = async (
  race: string,
  subRace: string
): Promise<{ result: any }> => {
  try {
    const response = await axios.get(
      `https://dog.ceo/api/breed/${race}/${subRace}/images/random/3`
    );
    return { result: response.data.message };
  } catch (err: any) {
    console.log("err: ", err);
    return err;
  }
};

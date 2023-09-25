import api from "../api";

export async function pegarRepositorios(id) {
  try {
    const response = await api.get(`/repos?postId=${id}`);
    return response.data;
  }
  catch (error) {
    console.log(error);
    return []
  }
}

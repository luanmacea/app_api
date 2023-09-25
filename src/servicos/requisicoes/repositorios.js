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

export async function salvarRepositoriosDoUsuario(postId, nome, data, id) {
  try {
    await api.put(`/repos/${id}`, {
      name: nome,
      data: data,
      postId: postId
    });
    return 'sucesso'
  }
  catch (error) {
    console.log(error)
    return 'erro'
  }
}

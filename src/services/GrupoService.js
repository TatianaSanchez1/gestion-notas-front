import axios from "axios";

const Grupo_API_BASE_URL = "http://localhost:8080/api";

class GrupoService { 
      getGrupo(){
      return axios.get(Grupo_API_BASE_URL + '/grupos');

   }

   getGrupoById(grupoId) {
      return axios.get(Grupo_API_BASE_URL + '/' + grupoId + '/grupos/');
  }
}

export default new GrupoService()
import api from '../api';

export const campsiteService = {
  getAllCampsites: async () => {
    const response = await api.get('/campsites');
    return response.data;
  },

  getCampsiteById: async (id) => {
    const response = await api.get(`/campsites/${id}`);
    return response.data;
  },

  createCampsite: async (campsiteData) => {
    const response = await api.post('/campsites', campsiteData);
    return response.data;
  },

  updateCampsite: async (id, campsiteData) => {
    const response = await api.put(`/campsites/${id}`, campsiteData);
    return response.data;
  },

  deleteCampsite: async (id) => {
    const response = await api.delete(`/campsites/${id}`);
    return response.data;
  }
};

export default campsiteService;

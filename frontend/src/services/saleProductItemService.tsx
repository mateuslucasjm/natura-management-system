import useHttp from "@/services/useHttp";
import type { SaleProductItem } from "@/types/saleProductItem";
import axios from "axios";

const saleProductItemService = {
  create: async (
    saleProductItem: SaleProductItem,
  ): Promise<SaleProductItem> => {
    try {
      const res = await useHttp.post("/sale-product-item", saleProductItem);
      return res.data;
    } catch (error) {
      console.log("Erro ao criar item da venda:", error);
      throw error;
    }
  },

  getById: async (id: number): Promise<SaleProductItem> => {
    try {
      const res = await useHttp.get(`/sale-product-item/${id}`);
      return res.data;
    } catch (error) {
      console.log("Erro ao obter item da venda por ID:", error);
      throw error;
    }
  },

  update: async (
    id: number,
    saleProductItem: SaleProductItem,
  ): Promise<SaleProductItem> => {
    try {
      console.log("ID do item:", id);
      console.log("Dados enviados:", saleProductItem);

      const res = await useHttp.patch(
        `/sale-product-item/${id}`,
        saleProductItem,
      );

      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Status:", error.response?.status);
        console.error("Resposta do backend:", error.response?.data);
      } else {
        console.error("Erro ao editar item da venda:", error);
      }

      throw error;
    }
  },

  remove: async (id: number): Promise<void> => {
    try {
      await useHttp.delete(`/sale-product-item/${id}`);
    } catch (error) {
      console.log("Erro ao remover item da venda:", error);
      throw error;
    }
  },
};

export default saleProductItemService;

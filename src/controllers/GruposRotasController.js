import { prisma } from "../configs/prismaClient.js";
import env from "dotenv";

env.config();

class GruposRotasController {

  static cadastrarGrupoRotas = async (req, res) => {
    try {
      const { grupo_id, rota_id, verbo_get, verbo_post, verbo_put, verbo_patch, verbo_delete, ativo} = req.body;

      if (!grupo_id || !rota_id) {
        return res.status(400).json([{ error: true, code: 400, message: " ID de Grupo e ID de Rotas são obrigatórios" }]);
      }

      const gruposRotasExists = await prisma.gruposRotas.findFirst({
        where: {
          grupo_id,
          rota_id,
        },
      });

      if (gruposRotasExists) {
        return res.status(400).json([{ error: true, code: 400, message: "Grupo Rota já cadastrado" }]);
      }

      const gruposRotasCreated = await prisma.gruposRotas.create({
        data: {
          grupo_id,
          rota_id,
          ativo: ativo || true,
          verbo_get,
          verbo_post,
          verbo_patch,
          verbo_put,
          verbo_delete,
        },
      });

      return res.status(201).json(gruposRotasCreated);
    } catch (err) {
      console.error(err);
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }]);
    }
  }

  static atualizarGrupoRotas = async (req, res) => {
    try {
      const gruposRotasId = req.params.id;
      const { grupo_id} = req.body;

      if (!grupo_id) {
        return res.status(400).json([{ error: true, code: 400, message: "Todos os campos devem estar preenchidos!" }]);
      }

      const gruposRotasExists = await prisma.gruposRotas.findUnique({
        where: {
          id: gruposRotasId,
        },
      });

      if (!gruposRotasExists) {
        return res.status(404).json([{ error: true, code: 404, message: "Grupo Rota não encontrado" }]);
      }

      const gruposRotasUpdated = await prisma.gruposRotas.update({
        where: {
          id: gruposRotasId,
        },
        data: {
          grupo_id,
          rota_id,
          ativo: ativo || true,
          verbo_get,
          verbo_post,
          verbo_patch,
          verbo_put,
          verbo_delete,
        },
      });

      return res.status(200).json(gruposRotasUpdated);
    } catch (err) {
      console.error(err);
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }]);
    }
  }

  static listarGrupoRotas = async (req, res) => {
    try {
      const gruposRotas = await prisma.gruposRotas.findMany();
      return res.status(200).json(gruposRotas);
    } catch (err) {
      console.error(err);
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }]);
    }
  }

  static listarGrupoRotasPorId = async (req, res) => {
    try {
      const gruposRotasId = req.params.id;

      const gruposRotas= await prisma.gruposRotas.findUnique({
        where: {
          id: gruposRotasId,
        },
      });

      if (gruposRotas) {
        return res.status(200).json(gruposRotas);
      } else {
        return res.status(404).json([{ error: true, code: 404, message: "Grupo Rota não encontrado" }]);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }]);
    }
  }

  static excluirGrupoRotas = async (req, res) => {
    try {
      const gruposRotasId = req.params.id;

      const gruposRotasExists = await prisma.gruposRotas.findUnique({
        where: {
          id: gruposRotasId,
        },
      });

      if (!gruposRotasExists) {
        return res.status(404).json([{ error: true, code: 404, message: "Grupo Rota não encontrado" }]);
      }

      await prisma.gruposRotas.delete({
        where: {
          id: gruposRotasId,
        },
      });

      return res.status(204).send();
    } catch (err) {
      console.error(err);
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }]);
    }
  }
}

export default GruposRotasController;

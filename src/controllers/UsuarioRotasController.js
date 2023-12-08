import { prisma } from "../configs/prismaClient.js";
import env from "dotenv";

env.config();

class UsuariosRotasController {

  static cadastrarUsuariosRotas = async (req, res) => {
    try {
      const { grupo_id, rota_id, verbo_get, verbo_post, verbo_put, verbo_patch, verbo_delete, ativo} = req.body;

      if (!grupo_id || !rota_id) {
        return res.status(400).json([{ error: true, code: 400, message: " ID de Grupo e ID de Rotas são obrigatórios" }]);
      }

      const usuariosRotasExists = await prisma.usuariosRotas.findFirst({
        where: {
          grupo_id,
          rota_id,
        },
      });

      if (usuariosRotasExists) {
        return res.status(400).json([{ error: true, code: 400, message: "Rota de Usuarios já cadastrada" }]);
      }

      const usuariosRotasCreated = await prisma.usuariosRotas.create({
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

      return res.status(201).json(usuariosRotasCreated);
    } catch (err) {
      console.error(err);
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }]);
    }
  }

  static atualizarUsuariosRotas = async (req, res) => {
    try {
      const usuariosRotasId = req.params.id;
      const { grupo_id} = req.body;

      if (!grupo_id) {
        return res.status(400).json([{ error: true, code: 400, message: "Todos os campos devem estar preenchidos!" }]);
      }

      const usuariosRotasExists = await prisma.usuariosRotas.findUnique({
        where: {
          id: usuariosRotasId,
        },
      });

      if (!usuariosRotasExists) {
        return res.status(404).json([{ error: true, code: 404, message: "Rota de Usuarios não encontrada" }]);
      }

      const usuariosRotasUpdated = await prisma.usuariosRotas.update({
        where: {
          id: usuariosRotasId,
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

      return res.status(200).json(usuariosRotasUpdated);
    } catch (err) {
      console.error(err);
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }]);
    }
  }

static listarUsuariosRotas = async (req, res) => {
  try {
    const usuariosRotas = await prisma.usuariosRotas.findMany();
    return res.status(200).json(usuariosRotas);
  } catch (err) {
    console.error(err);
    return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }]);
  }
}

static listarUsuariosRotasPorId = async (req, res) => {
  try {
    const usuariosRotasId = req.params.id;

    const usuariosRotas= await prisma.usuariosRotas.findUnique({
      where: {
        id: usuariosRotasId,
      },
    });

    if (usuariosRotas) {
      return res.status(200).json(usuariosRotas);
    } else {
      return res.status(404).json([{ error: true, code: 404, message: "Rota de Usuarios não encontrada" }]);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }]);
  }
}

  static excluirUsuariosRotas = async (req, res) => {
    try {
      const usuariosRotasId = req.params.id;

      const usuariosRotasExists = await prisma.usuariosRotas.findUnique({
        where: {
          id: usuariosRotasId,
        },
      });

      if (!usuariosRotasExists) {
        return res.status(404).json([{ error: true, code: 404, message: "Rota de Usuarios não encontrada" }]);
      }

      await prisma.usuariosRotas.delete({
        where: {
          id: usuariosRotasId,
        },
      });

      return res.status(204).send();
    } catch (err) {
      console.error(err);
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }]);
    }
  }
}

export default UsuariosRotasController;

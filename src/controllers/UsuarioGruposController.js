import { prisma } from "../configs/prismaClient.js";
import env from "dotenv";

env.config();

class UsuariosGruposController {
  
  static cadastrarUsuariosGrupos = async (req, res) => {
    try {
      const { grupo_id, usuario_id, verbo_get, verbo_post, verbo_put, verbo_patch, verbo_delete, ativo} = req.body;

      if (!grupo_id || !usuario_id) {
        return res.status(400).json([{ error: true, code: 400, message: " ID de Grupo e ID de Usuarios são obrigatórios" }]);
      }

      const usuariosGruposExists = await prisma.usuariosGrupos.findFirst({
        where: {
          grupo_id,
          usuario_id,
        },
      });

      if (usuariosGruposExists) {
        return res.status(400).json([{ error: true, code: 400, message: "Grupo de Usuarios já cadastrada" }]);
      }

      const usuariosGruposCreated = await prisma.usuariosGrupos.create({
        data: {
          grupo_id,
          usuario_id,
          ativo: ativo || true,
          verbo_get,
          verbo_post,
          verbo_patch,
          verbo_put,
          verbo_delete,
        },
      });

      return res.status(201).json(usuariosGruposCreated);
    } catch (err) {
      console.error(err);
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }]);
    }
  }

  static atualizarUsuariosGrupos = async (req, res) => {
    try {
      const usuariosGruposId = req.params.id;
      const { grupo_id} = req.body;

      if (!grupo_id) {
        return res.status(400).json([{ error: true, code: 400, message: "Todos os campos devem estar preenchidos!" }]);
      }

      const usuariosGruposExists = await prisma.usuariosGrupos.findUnique({
        where: {
          id: usuariosGruposId,
        },
      });

      if (!usuariosGruposExists) {
        return res.status(404).json([{ error: true, code: 404, message: "Grupo de Usuarios não encontrada" }]);
      }

      const usuariosGruposUpdated = await prisma.usuariosGrupos.update({
        where: {
          id: usuariosGruposId,
        },
        data: {
          grupo_id,
          usuario_id,
          ativo: ativo || true,
          verbo_get,
          verbo_post,
          verbo_patch,
          verbo_put,
          verbo_delete,
        },
      });

      return res.status(200).json(usuariosGruposUpdated);
    } catch (err) {
      console.error(err);
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }]);
    }
  }

static listarUsuariosGrupos = async (req, res) => {
  try {
    const usuariosGrupos = await prisma.usuariosGrupos.findMany();
    return res.status(200).json(usuariosGrupos);
  } catch (err) {
    console.error(err);
    return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }]);
  }
}

static listarUsuariosGruposPorId = async (req, res) => {
  try {
    const usuariosGruposId = req.params.id;

    const usuariosGrupos= await prisma.usuariosGrupos.findUnique({
      where: {
        id: usuariosGruposId,
      },
    });

    if (usuariosGrupos) {
      return res.status(200).json(usuariosGrupos);
    } else {
      return res.status(404).json([{ error: true, code: 404, message: "Grupo de Usuarios não encontrada" }]);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }]);
  }
}

  static excluirUsuariosGrupos = async (req, res) => {
    try {
      const usuariosGruposId = req.params.id;

      const usuariosGruposExists = await prisma.usuariosGrupos.findUnique({
        where: {
          id: usuariosGruposId,
        },
      });

      if (!usuariosGruposExists) {
        return res.status(404).json([{ error: true, code: 404, message: "Grupo de Usuarios não encontrada" }]);
      }

      await prisma.usuariosGrupos.delete({
        where: {
          id: usuariosGruposId,
        },
      });

      return res.status(204).send();
    } catch (err) {
      console.error(err);
      return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }]);
    }
  }
}

export default UsuariosGruposController;

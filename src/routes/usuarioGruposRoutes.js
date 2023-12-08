import express from "express";
import UsuarioGruposController from "../controllers/UsuarioGruposController.js";
// import AuthMiddleware from "../middlewares/AuthMiddleware.js";
const router = express.Router();


/**
 * @swagger
 * paths:
 *  /usuarioGrupos:
 *    get:
 *      tags:
 *        - Usuario Grupos
 *      summary: Lista todos os grupos de usuarios com filtragem opcional
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: nome
 *          schema:
 *            type: string
 *          description: Filtrar por nome do grupo
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *          description: Número da página para paginação
 *        - in: query
 *          name: perPage
 *          schema:
 *            type: integer
 *          description: Número de registros por página
 *      responses:
 *        200:
 *          description: Retorna a lista de grupos de usuarios
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/UsuarioGrupos'
 *                  totalDocs:
 *                    type: integer
 *                  limit:
 *                    type: integer
 *                  totalPages:
 *                    type: integer
 *                  page:
 *                    type: integer
 *                  pagingCounter:
 *                    type: integer
 *                  hasPrevPage:
 *                    type: boolean
 *                  hasNextPage:
 *                    type: boolean
 *                  prevPage:
 *                    type: integer
 *                  nextPage:
 *                    type: integer
 *        400:
 *          description: ID inválido ou não encontrado
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: boolean
 *                  code:
 *                    type: integer
 *                  message:
 *                    type: string
 *        404:
 *          description: grupos de usuarios não encontrado
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: boolean
 *                  code:
 *                    type: integer
 *                  message:
 *                    type: string
 *    post:
 *      tags:
 *        - Usuario Grupos
 *      summary: Cria um novo grupo de usuarios
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UsuarioGrupos'
 *      responses:
 *        201:
 *          description: Grupo de Usuarios criado com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UsuarioGrupos'
 *        400:
 *          description: Erro ao criar o grupo de usuarios
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: boolean
 *                  message:
 *                    type: string
 *        500:
 *          description: Erro do Servidor Interno
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: boolean
 *                  message:
 *                    type: string
 *  /usuarioGrupos{id}:
 *    get:
 *      summary: Obter um grupo de usuarios por ID
 *      operationId: obter ID do Grupo de usuarios
 *      tags:
 *        - Usuario Grupos
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID do grupo de usuarios a ser recuperada
 *          required: true
 *          schema:
 *            type: string
 * 
 * 
 *      responses:
 *        200:
 *          description: Retorna o grupo de usuarios
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/UsuarioGrupos'
 *        400:
 *          description: ID inválido ou não encontrado
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: boolean
 *                  code:
 *                    type: integer
 *                  message:
 *                    type: string
 *        404:
 *          description: grupos de usuarios não encontrada
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: boolean
 *                  code:
 *                    type: integer
 *                  message:
 *                    type: string
 *
 *    patch:
 *      summary: Atualizar um grupo de usuarios por ID
 *      tags:
 *        - Usuario Grupos
 *      security:
 *        - bearerAuth: []
 *      description: Atualizar um grupo existente no banco de dados
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UsuarioGrupos'
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID do grupo de usuarios a ser atualizada
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: grupos de usuarios atualizado com sucesso.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/UsuarioGrupos'
 *        401:
 *          description: O usuário não tem permissão para atualizar o grupo de usuarios.
 *        500:
 *          description: Internal server error.
 *
 *    delete:
 *      summary: Excluir um grupo de usuarios por ID
 *      tags:
 *        - Usuario Grupos
 *      security:
 *        - bearerAuth: []
 *      description: Exclua um grupo de usuarios existente no banco de dados
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID do grupo de usuarios a ser excluída
 *          required: true
 *          schema:
 *            type: string
 *            format: string
 *      responses:
 *        200:
 *          description: Grupo de Usuarios excluído com sucesso.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/UsuarioGrupos'
 *        401:
 *          description: O usuário não tem permissão para excluir o grupo de usuarios.
 *        500:
 *          description: Erro do Servidor Interno.
 */
router
  .post("/usuarioGrupos", UsuarioGruposController.cadastrarUsuariosGrupos)
  .patch("/usuarioGrupos/:id", UsuarioGruposController.atualizarUsuariosGrupos)
  .get("/usuarioGrupos", UsuarioGruposController.listarUsuariosGrupos)
  .get("/usuarioGrupos/:id", UsuarioGruposController.listarUsuariosGruposPorId)
  .delete("/usuarioGrupos/:id", UsuarioGruposController.excluirUsuariosGrupos);

export default router;

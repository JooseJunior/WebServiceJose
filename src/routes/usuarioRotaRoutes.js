import express from "express";
import UsuarioRotasController from "../controllers/UsuarioRotasController.js";
// import AuthMiddleware from "../middlewares/AuthMiddleware.js";
const router = express.Router();


/**
 * @swagger
 * paths:
 *  /usuarioRotas:
 *    get:
 *      tags:
 *        - Usuario Rotas
 *      summary: Lista todas as rotas de usuarios com filtragem opcional
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: nome
 *          schema:
 *            type: string
 *          description: Filtrar por nome da rota
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
 *          description: Retorna a lista de rota de usuarios
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/UsuarioRotas'
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
 *          description: rota de usuarios não encontrada
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
 *        - Usuario Rotas
 *      summary: Cria uma nova rota de usuarios
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UsuarioRotas'
 *      responses:
 *        201:
 *          description: Rota de Usuarios criada com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UsuarioRotas'
 *        400:
 *          description: Erro ao criar a rota de usuarios
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
 *  /usuarioRotas{id}:
 *    get:
 *      summary: Obter uma rota de usuarios por ID
 *      operationId: obter ID da Rota de usuarios
 *      tags:
 *        - Usuario Rotas
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID da rota de usuarios a ser recuperada
 *          required: true
 *          schema:
 *            type: string
 * 
 * 
 *      responses:
 *        200:
 *          description: Retorna a rota de usuarios
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/UsuarioRotas'
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
 *          description: rota de usuarios não encontrada
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
 *      summary: Atualizar uma rota de usuarios por ID
 *      tags:
 *        - Usuario Rotas
 *      security:
 *        - bearerAuth: []
 *      description: Atualizar uma rota existente no banco de dados
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UsuarioRotas'
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID da rota de usuarios a ser atualizada
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: rota de usuarios atualizada com sucesso.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/UsuarioRotas'
 *        401:
 *          description: O usuário não tem permissão para atualizar a rota de usuarios.
 *        500:
 *          description: Internal server error.
 *
 *    delete:
 *      summary: Excluir uma rota de usuarios por ID
 *      tags:
 *        - Usuario Rotas
 *      security:
 *        - bearerAuth: []
 *      description: Exclua uma rota de usuarios existente no banco de dados
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID da rota de usuarios a ser excluída
 *          required: true
 *          schema:
 *            type: string
 *            format: string
 *      responses:
 *        200:
 *          description: Rota de grupo excluída com sucesso.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/UsuarioRotas'
 *        401:
 *          description: O usuário não tem permissão para excluir a rota de usuarios.
 *        500:
 *          description: Erro do Servidor Interno.
 */

router
  .post("/usuarioRotas", UsuarioRotasController.cadastrarUsuariosRotas)
  .patch("/usuarioRotas/:id", UsuarioRotasController.atualizarUsuariosRotas)
  .get("/usuarioRotas", UsuarioRotasController.listarUsuariosRotas)
  .get("/usuarioRotas/:id", UsuarioRotasController.listarUsuariosRotasPorId)
  .delete("/usuarioRotas/:id", UsuarioRotasController.excluirUsuariosRotas);

export default router;

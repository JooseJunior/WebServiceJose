import express from "express";
import GrupoController from "../controllers/GrupoController.js";
// import AuthMiddleware from "../middlewares/AuthMiddleware.js";
const router = express.Router();


/**
 * @swagger
 * paths:
 *  /grupo:
 *    get:
 *      tags:
 *        - Grupo
 *      summary: Lista todos os grupo com filtragem opcional
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
 *          description: Retorna a lista de grupo 
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Grupo'
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
 *          description: grupo não encontrado
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
 *        - Grupo
 *      summary: Cria um novo  grupo 
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Grupo'
 *      responses:
 *        201:
 *          description: Grupo  criado com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Grupo'
 *        400:
 *          description: Erro ao criar o grupo 
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
 *  /grupo/{id}:
 *    get:
 *      summary: Obter um grupo por ID
 *      operationId: obter ID do Grupo
 *      tags:
 *        - Grupo
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID da grupo a ser recuperada
 *          required: true
 *          schema:
 *            type: string
 * 
 * 
 *      responses:
 *        200:
 *          description: Retorna o grupo 
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Grupo'
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
 *          description: grupo não encontrado
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
 *      summary: Atualizar um grupo por ID
 *      tags:
 *        - Grupo
 *      security:
 *        - bearerAuth: []
 *      description: Atualizar um grupo existente no banco de dados
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Grupo'
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID do grupo a ser atualizado
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: grupo atualizado com sucesso.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Grupo'
 *        401:
 *          description: O usuário não tem permissão para atualizar o grupo .
 *        500:
 *          description: Internal server error.
 *
 *    delete:
 *      summary: Excluir um grupo por ID
 *      tags:
 *        - Grupo
 *      security:
 *        - bearerAuth: []
 *      description: Exclua um grupo existente no banco de dados
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID do grupo a ser excluído
 *          required: true
 *          schema:
 *            type: string
 *            format: string
 *      responses:
 *        200:
 *          description: Grupo excluído com sucesso.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Grupo'
 *        401:
 *          description: O usuário não tem permissão para excluir o grupo.
 *        500:
 *          description: Erro do Servidor Interno.
 */

router
  .post("/grupo", GrupoController.cadastrarGrupo)
  .patch("/grupo/:id", GrupoController.atualizarGrupo)
  .get("/grupo", GrupoController.listarGrupos)
  .get("/grupo/:id", GrupoController.listarGrupoPorId)
  .delete("/grupo/:id", GrupoController.excluirGrupo)

export default router;

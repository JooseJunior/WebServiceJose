import express from "express";
import GruposRotasController from "../controllers/GruposRotasController.js";
// import AuthMiddleware from "../middlewares/AuthMiddleware.js";
const router = express.Router();

/**
 * @swagger
 * paths:
 *  /grupoRotas:
 *    get:
 *      tags:
 *        - Grupo Rotas
 *      summary: Lista todos os grupo de rotas com filtragem opcional
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
 *          description: Retorna a lista de grupo de rotas
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/GrupoRotas'
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
 *          description: grupo de rotas não encontrado
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
 *        - Grupo Rotas
 *      summary: Cria um novo  grupo de rotas
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GrupoRotas'
 *      responses:
 *        201:
 *          description: Grupo de rotas criado com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/GrupoRotas'
 *        400:
 *          description: Erro ao criar o grupo de rotas
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
 *  /grupoRotas{id}:
 *    get:
 *      summary: Obter um grupo de rotas por ID
 *      operationId: obter ID do Grupo rotas
 *      tags:
 *        - Grupo Rotas
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID da grupo de rotas a ser recuperada
 *          required: true
 *          schema:
 *            type: string
 * 
 * 
 *      responses:
 *        200:
 *          description: Retorna o grupo de rotas
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/GrupoRotas'
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
 *          description: grupo de rotas não encontrado
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
 *      summary: Atualizar um grupo de rota por ID
 *      tags:
 *        - Grupo Rotas
 *      security:
 *        - bearerAuth: []
 *      description: Atualizar um grupo existente no banco de dados
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GrupoRotas'
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID do grupo de rotas a ser atualizado
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: grupo de rotas atualizado com sucesso.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/GrupoRotas'
 *        401:
 *          description: O usuário não tem permissão para atualizar o grupo de rotas.
 *        500:
 *          description: Internal server error.
 *
 *    delete:
 *      summary: Excluir um grupo de rotas por ID
 *      tags:
 *        - Grupo Rotas
 *      security:
 *        - bearerAuth: []
 *      description: Exclua um grupo de rotas existente no banco de dados
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID do grupo de rotas a ser excluído
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
 *                      $ref: '#/components/schemas/GrupoRotas'
 *        401:
 *          description: O usuário não tem permissão para excluir o grupo de rotas.
 *        500:
 *          description: Erro do Servidor Interno.
 */


router
  .post("/grupoRotas", GruposRotasController.cadastrarGrupoRotas)
  .patch("/grupoRotas/:id", GruposRotasController.atualizarGrupoRotas)
  .get("/grupoRotas", GruposRotasController.listarGrupoRotas)
  .get("/grupoRotas/:id", GruposRotasController.listarGrupoRotasPorId)
  .delete("/grupoRotas/:id", GruposRotasController.excluirGrupoRotas);

  export default router;
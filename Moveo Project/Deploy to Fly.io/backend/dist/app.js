"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var logger_1 = require("./middlewares/logger");
var not_found_1 = require("./middlewares/not-found");
var error_handler_1 = require("./middlewares/error-handler");
var code_box_controller_1 = require("../backend/code-box/code-box.controller");
var socket_io_1 = require("socket.io");
var db_1 = require("../backend/db");
var config_1 = require("./config");
var app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: config_1.config.frontendDomain,
    credentials: true
}));
// logger middleware for all requests
app.use(logger_1.logger);
// JSON parse the request body
app.use(express_1.default.json());
// all code routes
app.use('/api/v1/code', code_box_controller_1.codeBoxRouter);
// not found middleware
app.use(not_found_1.notFound);
// generic error handler
app.use(error_handler_1.errorHandler);
// start the server
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var httpServer, clients, socketServer;
    return __generator(this, function (_a) {
        httpServer = app.listen(3001, function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, db_1.databaseMigration)()];
                    case 1:
                        _a.sent();
                        console.log('Service is listening....');
                        return [2 /*return*/];
                }
            });
        }); });
        clients = {};
        socketServer = new socket_io_1.Server(httpServer, { cors: { origin: '*' } });
        socketServer.sockets.on('connection', function (socket) {
            console.log("Socket A new client (".concat(socket.id, ") has been connnected: "));
            clients[socket.id] = socket;
            socket.emit("set_role", Object.keys(clients).length === 1 ? 'mentor' : 'student');
            // listen to a client disconnection
            socket.on("disconnect", function () {
                console.log("Socket A client (".concat(socket.id, ") has been disconnected: "));
                delete clients[socket.id];
            });
            // when the client sends a message, send it to all connected clients
            socket.on("send_update", function (msg) {
                console.log('updated msg', msg);
                socket.broadcast.emit('receive_update', msg);
            });
        });
        return [2 /*return*/];
    });
}); })();

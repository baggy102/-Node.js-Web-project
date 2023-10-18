"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var multer_1 = __importDefault(require("multer"));
var router = express_1.default.Router();
var user_info = require("../controller/Cuser_info");
var wanter_board = require("../controller/Cwanter_board");
var wanter_comment = require("../controller/Cwanter_comment");
var helper_board = require("../controller/Chelper_board");
var helper_comment = require("../controller/Chelper_comment");
var notice = require("../controller/Cnotice");
var path = require("path");
var uploadDetail = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: function (req, file, done) {
            done(null, "../client/public/userImg");
        },
        filename: function (req, file, done) {
            var ext = path.extname(file.originalname);
            done(null, Date.now() + ext);
        },
    }),
    limits: { fileSize: 1 * 1024 * 1024 }, // 1mb제한해둠
});
// const upload = multer({ storage: uploadDetail });
// /api/xxxx
// ======= User sign =======
router.post("/login", user_info.userLogin);
router.post("/register", user_info.userRegister);
router.post("/checkId", user_info.checkUserId);
router.post("/checkName", user_info.checkUserName);
router.post("/logout", user_info.userLogout);
router.delete("/user/:userId", user_info.userWithdrawal);
router.patch("/user/:userId", user_info.userUpdate);
// 전체 유저 확인하기
router.get("/user", user_info.read_user);
// 추천수 상위 5명 유저
router.get("/mainUser", user_info.read_few_user);
// 개인별 확인하기 params
router.get("/user/:user", user_info.read_detail_user);
// 추천누르기
router.post("/user/:user/userLike", user_info.userLike);
// 유저 작성 wanter & helper
router.post("/user/wanter", user_info.user_wanter_board);
router.post("/user/helper", user_info.user_helper_board);
// 이미지파일 저장
router.post("/user/:user/img", uploadDetail.single("user_img"), user_info.set_user_img);
// 유저끼리 좋아요 (Follow)
router.post("/user/:user/like", user_info.user_like);
// ======= Wanter_board =======
router.get("/mainWanter", wanter_board.read_few_wanter_board);
router.get("/wanter", wanter_board.read_wanter_board);
router.get("/wanter/:boardId", wanter_board.read_one_wanter_board);
router.post("/wanter", wanter_board.create_wanter_board);
router.patch("/wanter/:boardId", wanter_board.update_wanter_board);
router.delete("/wanter/:boardId", wanter_board.delete_wanter_board);
router.post("/wanter/:boardId/hit", wanter_board.hit_wanter_board);
router.post("/wanter/:boardId/like", wanter_board.wanter_board_like);
router.patch("/wanter/:boardId/done", wanter_board.done_wanter_board);
// router.patch("/wanter/:boardId/proceed", wanter_board.proceed_wanter_board);
// ======= Wanter_comment =======
router.get("/wanter/:boardId/comment", wanter_comment.read_wanter_comment);
router.post("/wanter/:boardId/comment", wanter_comment.create_wanter_comment);
router.patch("/wanter/:boardId/comment/:commentId", wanter_comment.update_wanter_comment);
router.delete("/wanter/:boardId/comment/:commentId", wanter_comment.delete_wanter_comment);
// ======= Helper_board =======
router.get("/mainHelper", helper_board.read_few_helper_board);
router.get("/helper", helper_board.read_helper_board);
router.get("/helper/:boardId", helper_board.read_one_helper_board);
router.post("/helper", helper_board.create_helper_board);
router.patch("/helper/:boardId", helper_board.update_helper_board);
router.delete("/helper/:boardId", helper_board.delete_helper_board);
router.post("/helper/:boardId/hit", helper_board.hit_helper_board);
router.post("/helper/:boardId/like", helper_board.helper_board_like);
// ======= Helper_comment =======
router.get("/helper/:boardId/comment", helper_comment.read_helper_comment);
router.post("/helper/:boardId/comment", helper_comment.create_helper_comment);
router.patch("/helper/:boardId/comment/:commentId", helper_comment.update_helper_comment);
router.delete("/helper/:boardId/comment/:commentId", helper_comment.delete_helper_comment);
// ======= Notice Board =======
router.get("/mainNotice", notice.read_few_notice);
router.get("/notice", notice.read_notice);
router.get("/notice/:boardId", notice.read_one_notice);
router.post("/notice", notice.create_notice);
router.patch("/notice/:boardId", notice.update_notice);
router.delete("/notice/:boardId", notice.delete_notice);
// search;
router.get("/search/:boardType/:optionValue", wanter_board.search_wanter_board);
// module.exports = router;
exports.default = router;

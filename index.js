const Koa = require("koa");
const Router = require("koa-router");
const server = require("koa-static");
const userData = require("./data/users.json");
const koaBody = require("koa-body");
const fs = require("fs");
console.log(userData)

const app = new Koa();
const router = new Router();
// console.log(__dirname)
app.use(server(__dirname + "/static"));
app.use(koaBody({
    multipart:true,    //设置允许接收文件
}))
// app.use((ctx)=>{
// ctx.body = "hello world"
// })

router.get("/checkUserName", (ctx,next) => {
  //     console.log("1111")
//   console.log(ctx.query);
  console.log(ctx.query.userName)
  let res = userData.find((item)=>{
return item.username === ctx.query.userName
  })
  if(res){
      ctx.body = {
          status:01,
          msg:"用户名正确"
      }
  }else{
    ctx.body = {
        status:0,
        msg:"用户名错误"
    }
  }
//   ctx.body = "hello world";
});
router.get("/get/:id",(ctx,next)=>{
    console.log(ctx.params);
    ctx.body = {
        status:1,
        msg:"获取成功"
    }
})

router.post('/post',(ctx,next)=>{
    // console.log(ctx.request.body);
    ctx.body = {
        status:1,
        msg:"获取成功"
    }

})

router.post('/upload',(ctx)=>{
console.log("+++111+++")
    console.log(ctx.request.files);
    const fsReadFile = fs.readFileSync(ctx.request.files.img.path)
    fs.writeFileSync = fs.writeFileSync("static/imgs/"+ctx.request.files.img.name,fsReadFile)
    // console.log(ctx.request.files)
    ctx.body = {
        status:1,
        msg:"图片上传成功"
    }

})

app.use(router.routes());

app.listen(3003);

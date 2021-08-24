const path = require('path')
const fs = require('fs')
const Spritesmith = require('spritesmith')

const removeDir = (dir) => {
  let files = fs.readdirSync(dir)
  files.forEach(item => {
    let newPath = path.join(dir,item);
    let stat = fs.statSync(newPath)
    if(stat.isDirectory()){
      removeDir(newPath);
    } else {
      fs.unlinkSync(newPath);
    }
  })
  fs.rmdirSync(dir) 
}
 
module.exports = function (content) {
  let callback = this.async()
  let imgPaths = content.match(/url\(('|")?(.*)\?__sprite('|")?/g)
  if(!imgPaths){
    // return orginal css
    callback(null,content) 
  } else {
    imgPaths = imgPaths.map(item => path.join(this.context,item.match(/url\(('|")?(.*)\?__sprite('|")?/)[2]))
    Spritesmith.run(
      {
        src: imgPaths
      }, 
      (err,result) => {
        const dirname = path.join(this.context,'sprites')
        const filename = path.join(this.context,'sprites/sprite.png')
        // delete the folder and sprite file
        if(fs.existsSync(dirname)){
          removeDir(dirname)
        }
        // reproduce the folder and sprite file
        fs.mkdirSync(dirname)
        fs.writeFileSync(filename,result.image)
        // edit css
        let coordinate = Object.values(result.coordinates)
        let index = 0
        content = content.replaceAll(/url\(('|")?(.*)\?__sprite('|")?\)(.*);/g,match => {
                  const {x,y} = coordinate[index]
                  index++
                  let res = `${match}\r\n  background-position: ${-x}px ${-y}px;`
                  return res.replace(/url\((.*)\)/,() => 'url(./sprites/sprite.png)')                    
                })              
        // return resovled css        
        callback(null,content) 
      }
    );
  }   
}
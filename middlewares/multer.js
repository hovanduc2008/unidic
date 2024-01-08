const multer = require('multer');
const fs = require('fs');

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const directory = 'public/temporary';

      // Kiểm tra sự tồn tại của thư mục
      if (!fs.existsSync(directory)) {
        // Tạo thư mục nếu nó không tồn tại
        fs.mkdirSync(directory, { recursive: true }); // sử dụng { recursive: true } để tạo tất cả các thư mục cần thiết
      }

      cb(null, directory);
    },
    filename: async function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });

  const videostorage = multer.diskStorage({
    destination: function (req, file, cb) {
      const directory = 'public/videos';
  
      // Kiểm tra sự tồn tại của thư mục
      if (!fs.existsSync(directory)) {
        // Tạo thư mục nếu nó không tồn tại
        fs.mkdirSync(directory, { recursive: true }); // sử dụng { recursive: true } để tạo tất cả các thư mục cần thiết
      }
  
      cb(null, directory);
    },
    filename: async function (req, file, cb) {
      const fileExtension = file.originalname.split('.').pop(); // Lấy phần mở rộng của tệp
      const formattedDate = new Date().toISOString().replace(/[-T:.Z]/g, ''); // Định dạng ngày và giờ hiện tại
      const customFilename = `video_${formattedDate}.${fileExtension}`;
      cb(null, customFilename);
    }
  });
  
  
const upload = multer({ storage: storage });
const uploadvideo = multer({ storage: videostorage });

module.exports = {upload, uploadvideo};
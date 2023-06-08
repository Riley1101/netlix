import multer from "multer";

export function get_multer(path: string) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "/tmp/my-uploads");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix);
    },
  });

  const upload = multer({ storage: storage });
  return upload;
}

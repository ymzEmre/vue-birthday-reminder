const httpStatus = require('http-status');
const { passwordToHash, generateAccessToken, generateRefreshToken } = require('../scripts/utils/helper');
const uuid = require('uuid');
const eventEmitter = require('../scripts/events/eventEmitter');
const path = require('path');
const UserService = require('../services/UserService');
const CustomerService = require('../services/CustomerService');

class User {
  create(req, res) {
    req.body.password = passwordToHash(req.body.password);
    UserService.create(req.body)
      .then((response) => {
        res.status(httpStatus.CREATED).send(response);
      })
      .catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
      });
  }
  login(req, res) {
    req.body.password = passwordToHash(req.body.password);
    UserService.findOne(req.body)
      .then((user) => {
        if (!user) return res.status(httpStatus.NOT_FOUND).send({ message: 'Böyle bir kullanıcı bulunmamaktadır' });
        user = {
          ...user.toObject(),
          tokens: {
            access_token: generateAccessToken(user),
            refresh_token: generateRefreshToken(user),
          },
        };
        delete user.password;
        res.status(httpStatus.OK).send(user);
      })
      .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
  }
  index(req, res) {
    UserService.list()
      .then((response) => {
        res.status(httpStatus.OK).send(response);
      })
      .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
  }
  customerList(req, res) {
    CustomerService.list({ user_id: req.user?._id })
      .then((projects) => {
        res.status(httpStatus.OK).send(projects);
      })
      .catch(() =>
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
          error: 'Projeleri getirirken beklenmedik bir hata oluştu.',
        })
      );
  }
  resetPassword(req, res) {
    new_password = uuid.v4()?.split('-')[0] || `usr-${new Date().getTime()}`;
    UserService.updateWhere({ email: req.body.email }, { password: passwordToHash(new_password) })
      .then((updatedUser) => {
        if (!updatedUser)
          return res.status(httpStatus.NOT_FOUND).send({ error: 'Böyle bir kullanıcı bulunmamaktadır' });

        eventEmitter.emit('send_email', {
          to: updatedUser.email,
          subject: 'Şifre Sıfırlama',
          html: `Talebiniz üzerine şifre sıfırlama işleminiz gerçekleşmiştir. <br /> Giriş yaptıktan sonra şifrenizi değiştirmeyi unutmayın! <br /> Yeni Şifreniz : <b>${new_password}</b>`,
        });

        res.status(httpStatus.OK).send({
          message: 'Şifre sıfırlama işlemi için sisteme kayıtlı e-posta adresinize gereken bilgileri gönderdik.',
        });
      })
      .catch(() =>
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Şifre resetleme sırasında bir problem oluştu.' })
      );
  }
  update(req, res) {
    UserService.update(req.user?._id, req.body)
      .then((updatedUser) => {
        res.status(httpStatus.OK).send(updatedUser);
      })
      .catch(() =>
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Güncelleme işlemi sırasında bir problem oluştu.' })
      );
  }
  changePassword(req, res) {
    //!... UI Geldikten sonra Şifre karşılaştırmalarına ilişkin kurallar burada yer alacaktır..
    req.body.password = passwordToHash(req.body.password);
    UserService.update(req.user?._id, req.body)
      .then((updatedUser) => {
        res.status(httpStatus.OK).send(updatedUser);
      })
      .catch(() =>
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Güncelleme işlemi sırasında bir problem oluştu.' })
      );
  }
  deleteUser(req, res) {
    if (!req.params?.id) {
      return res.status(httpStatus.BAD_REQUEST).send({
        message: 'ID Bilgisi Eksik.',
      });
    }
    UserService.delete(req.params?.id)
      .then((deletedItem) => {
        if (!deletedItem) {
          return res.status(httpStatus.NOT_FOUND).send({
            message: 'Böyle bir kayıt bulunmamaktadır.',
          });
        }
        res.status(httpStatus.OK).send({
          message: 'Kayıt Silinmiştir',
        });
      })
      .catch((e) =>
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Silme işlemi sırasında bir problem oluştu.' })
      );
  }
  updateProfileImage(req, res) {
    //! 1 - Resim kontrolü
    if (!req?.files?.profile_image) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ error: 'Bu işlemi yapabilmek için yeterli veriye sahip değilsiniz.' });
    }
    //! 2 - Upload İşlemi
    extension = path.extname(req.files.profile_image.name);
    fileName = `${req?.user._id}${extension}`;
    folderPath = path.join(__dirname, '../', 'uploads/users', fileName);
    req.files.profile_image.mv(folderPath, function (err) {
      if (err) return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: err });
      UserService.update(req.user._id, { profile_image: fileName })
        .then((updatedUser) => {
          res.status(httpStatus.OK).send(updatedUser);
        })
        .catch((e) =>
          res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ error: 'Upload Başarılı fakat kayıt sırasında bir problem oluştu' })
        );
    });

    //! 3 - DB Save İşlemi
    //! 4 - Responses
  }
}

module.exports = new User();

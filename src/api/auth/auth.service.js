import jwt from 'jsonwebtoken';
import { hashSync, compareSync } from 'bcrypt';
import nodemailer from 'nodemailer';
import * as usersRepository from '../users/users.repository.js';

const { EMAIL_SERVICE, EMAIL_HEADER } = process.env;

function getToken ({ id, isAdmin, username }) {
  const payload = { id, isAdmin, username };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  return token;
}

export async function register ({
  username, password, email
}) {
  try {
    const hashedPassword = hashSync(password, 10);
    const dbUser = await usersRepository.create({
      username, password: hashedPassword, email
    });
    if (!dbUser) {
      const myError = {
        status: 500,
        message: 'Some problem creating the user'
      };

      throw new Error(JSON.stringify(myError));
    }

    const { id, isAdmin } = dbUser;

    const emailToken = getToken({ id, isAdmin, username });
    if (!emailToken) {
      const myError = {
        status: 500,
        message: 'Some problem generating token'
      };

      throw new Error(JSON.stringify(myError));
    }

    const transporter = nodemailer.createTransport({
      service: EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    const url = process.env.HOST + process.env.CONFIRM_ROUTE + emailToken;

    await transporter.sendMail({
      from: EMAIL_HEADER,
      to: email,
      subject: 'Confirma tu registro.',
      html: `
        <h3>Bienvenido, estas a un paso de registrarte🚶</h3>
        <h2><a href="${url}">Click aqui para confirmar tu registro</a></h2>
      `
    });
    console.log(`Usuario registrado con éxito. Validacion de usuario pendiente en el enlace enviado a ${email}`, dbUser);
  } catch (error) {
    console.error('error', error);
  }
  const message = { ok: true, message: 'User created successfully' };
  return message;
}

export async function login ({ username, password }) {
  const dbUser = await usersRepository.getByUsername({ username });
  if (!dbUser) {
    const myError = {
      status: 401,
      message: 'Wrong credentials'
    };
    throw new Error(JSON.stringify(myError));
  }

  const isSamePassword = compareSync(password, dbUser.password);
  if (!isSamePassword) {
    const myError = { ok: false, message: 'Wrong credentials password', status: 401 };
    throw new Error(JSON.stringify(myError));
  }

  if (!dbUser.confirmed) {
    const myError = {
      status: 401,
      message: 'User not confirmed'
    };

    throw new Error(JSON.stringify(myError));
  }

  const { id, isAdmin } = dbUser;

  const token = getToken({ id, isAdmin, username });
  if (!token) {
    const myError = {
      status: 500,
      message: 'Some problem generating token'
    };

    throw new Error(JSON.stringify(myError));
  }
  const userDataAndtoken = { ...dbUser, token };
  delete userDataAndtoken.password;
  return userDataAndtoken;
}

export async function confirm ({ emailtoken }) {
  try {
    const tokenConfirmedEmail = emailtoken;
    let username;
    jwt.verify(tokenConfirmedEmail, process.env.JWT_SECRET, async (err, payload) => {
      if (err) {
        console.error(err.message);
      } else {
        username = payload.username;
      }
    });
    await usersRepository.confirm({ username });
  } catch (error) {
    console.error(error);
  }
}

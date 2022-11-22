import { ErrorRequestHandler } from 'express';
import Messages from '../Enums/Messages';
import StatusCode from '../Enums/StatusCode';

const ErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  try {
    if (err.status) {
      return res.status(err.status).json({ message: err.message });
    }
    return res.status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: Messages.INTERNAL_SERVER_ERROR });
  } catch (error) {
    next(error);
  }
};

export default ErrorHandler;
class ExceptionManager {

  sendData(response, data) {
    return response.status(200).json({
      state: true,
      data
    });
  }

  createdData(response, data) {
    return response.status(201).json({
      state: true,
      data
    });
  }

  acceptedData(response, data) {
    return response.status(202).json({
      state: true,
      data
    });
  }

  noneAuthData(response, errors) {
    return response.status(203).json({
      state: false,
      errors
    });
  }

  badRequestData(response, msj, err) {
    return response.status(400).json({
      state: false,
      errors: {
        msj,
        err
      }
    });
  }

  unauthorizedRequestData(res, msj, err) {
    return res.status(401).json({
      state: false,
      errors: {
        msj,
        err
      }
    });
  }

  forbiddenRequestData(res, msj) {
    return res.status(403).json({
      state: false,
      errors: { msj }
    });
  }

  notFountData(res, type, id) {
    return res.status(404).json({
      state: false,
      errors: {
        msj: `${type} ${id} not found`
      }
    });
  }

  sendDataBaseError(res, err) {
    return res.status(500).json({
      state: false,
      errors: {
        msj: `Data Base Connection`,
        err
      }
    });
  }

}

module.exports = new ExceptionManager();
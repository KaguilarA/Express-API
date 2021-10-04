class ExceptionManager {

  sendData(response, data) {
    const jsonText = {
      state: true,
      data
    }
    return response.status(200).json(jsonText);
  }

  createdData(response, data) {
    const jsonText = {
      state: true,
      data
    }

    return response.status(201).json(jsonText);
  }

  acceptedData(response, data) {
    const jsonText = {
      state: true,
      data
    };
    return response.status(202).json(jsonText);
  }

  noneAuthData(response, data) {
    const jsonText = {
      state: false,
      errors: data
    };
    return response.status(203).json(jsonText);
  }

  badRequestData(response, msj, err) {
    const jsonText = {
      state: false,
      errors: {
        msj,
        err
      }
    };
    return response.status(400).json(jsonText);
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
    const errors = {
      msj: `${type} ${id} not found`
    }
    return res.status(404).json({
      state: false,
      errors
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
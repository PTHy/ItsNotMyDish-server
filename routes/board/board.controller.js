const models = require('../../models');
const distance = require('gps-distance');
const changeCase = require('change-object-case');

/*
  GET localhost:3000/board/:lat/:lng
*/

exports.getBoardList = async (req, res) => {
  const { lat, lng } = req.params;

  const boards = await models.Board.getBoardList(models);

  let sendData = [];
  const setDistance = new Promise((resolve, reject) => {
    try {
      boards.map(async (board, i) => {
        let newDistance = await CalcDistance(lat, lng, board.lat, board.lng)
        boards[i].distance = newDistance
        sendData.push(board);
      });
      resolve();
    } catch (error) {
      console.log(error.message);
      reject();
    }
  });

  const sortData = new Promise((resolve, reject) => {
    try{
      sendData.sort((a, b) => {
        if (a.distance > b.distance) {
          return 1;
        }
        if (a.distance < b.distance) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
      resolve();
    } catch (error) {
      console.log(error.message);
      reject();
    }
  });

  Promise.all([setDistance, sortData])
  .then(() => {
    res.json({
      status: 200,
      message: "보드리스트를 불러오는데 성공하였습니다",
      data: sendData,
    });
  })
  .catch(error => {
    console.log(error);
    res.json({
      status: 500,
      message: "보드리스트를 불러오는데 실패하였습니다",
    });
  })
}

function CalcDistance(lat1, lon1, lat2, lon2) {
  //Radius of the earth in:  1.609344 miles,  6371 km  | var R = (6371 / 1.609344);
  var R = 3958.7558657440545; // Radius of earth in Miles 
  var dLat = toRad(lat2-lat1);
  var dLon = toRad(lon2-lon1); 
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c;
  return d;
}

function toRad(Value) {
  /** Converts numeric degrees to radians */
  return Value * Math.PI / 180;
}


/*
  POST localhost:3000/board
  BODY content, dish_image, lat, lng
*/

exports.createBoard = async (req, res) => {
  const { userId } = req.decoded;
  const data = req.body;

  console.log(data);

  try {
    models.Board.create({
      content: data.content,
      userId,
      dishImage: data.dish_image,
      lat: data.lat,
      lng: data.lng,
    });

    res.json({
      status: 200,
      message: "보드가 생성되었습니다"
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: 200,
      message: "보드가 생성에 실패하였습니다"
    });
  } 
}

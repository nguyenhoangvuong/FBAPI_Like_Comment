const access_token = 'EAAAAZAw4FxQIBAGZB7iqnuxH4a4kQZASJa9st4wDgRsZBCJScjrAw1mwdPPVMbFqjlmsIKeNh4Xnh55zeCuDiJEX0oc1TxbynNCmtG6aN9xcACPGZCccfxm4l8rQdZBaAXlXVwOh2TDo4YAJ66SieOdD0p4ZBH666Jm6ruN0d8ZA9iSvgTZB9mBQRcDrw1LWX9EIZD';
var likes = 0;
var arrayPostID = [];
function init() {

  fetch('https://graph.facebook.com/109084718016669/posts?access_token=' + access_token).then(
    function (response) {
      if (response.status !== 200) {
        console.log('Lỗi, mã lỗi ' + response.status);
        return;
      }
      response.json().then(data => {
        //lấy tên fanpage
        document.getElementById('namePage').innerHTML = data.data[0].from.name;
        document.getElementById("namePage").href = "https://www.facebook.com/" + data.data[0].from.id;
        // Lap 3 lan de lau 3 bai viet dau tien
        for (let i = 0; i < 3; i++) {
          document.getElementById("post" + i).innerHTML = "Bài viết " + (i + 1) + " : " + data.data[i].message;
          arrayPostID.push(data.data[i].id);
          // cho ID cua 3 bai viet dau tien vo 1 cai mang ten la: arrayPostID
          // Voi ID cua moi bai viet, tiep tuc request de lay so luot like cua tung bai
          fetch('https://graph.facebook.com/' + data.data[i].id + '?fields=likes.summary(true)&access_token=' + access_token).then(
            function (response) {
              if (response.status !== 200) {
                console.log('Error :' + response.status);
                return;
              }
              // parse response data
              response.json().then(data => {
                // ghi so like tung bai viet qua ben file HTML
                document.getElementById("title" + i).innerHTML = "Lượt like : " + data.likes.summary.total_count;
              })
            }
          )
            .catch(err => {
              console.log('Error :-S', err)
            });
        }
      })
    }
  )
    .catch(err => {
      console.log('Error :-S', err)
    });
}
init();

// Ham xu li su kien cho button đăng
function myFunction(event) {
  var a = 0;
  if (event == 1) {
    a = arrayPostID[0];
  }
  if (event == 2) {
    a = arrayPostID[1];
  }
  if (event == 3) {
    a = arrayPostID[2];
  }
  var content = document.getElementById("exampleFormControlTextarea" + (event - 1)).value;
  const data = { access_token: access_token, message: content };
  fetch('https://graph.facebook.com/' + a + '/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      alert('Đăng bình luận thành công');
      document.getElementById('exampleFormControlTextarea' + (event - 1)).value = "";
    })
    .catch((error) => {
      console.error('Error:', error);
    });

}

import qr from 'qr-image';

// 添加事件监听器来处理请求
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

// 处理请求的函数
async function handleRequest(request) {
  const url = new URL(request.url);
  const text = url.searchParams.get('text') || 'Hello World';
  // 默认大小改为 350
  const size = parseInt(url.searchParams.get('size')) || 350;

  try {
    // 生成 PNG 格式的二维码
    const qrPng = qr.imageSync(text, { 
      type: 'png',
      size: size / 25,  // qr-image 库的 size 参数需要调整以匹配实际像素大小
      margin: 1  // 将边距改为最小值 1（qr-image 不支持 0 边距）
    });
    
    // 返回二维码图片
    return new Response(qrPng, {
      headers: {
        'Content-Type': 'image/png',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    return new Response('Error generating QR code: ' + error.message, {
      status: 500
    });
  }
}

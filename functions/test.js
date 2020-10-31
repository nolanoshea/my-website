exports.handler = async function(event, context) {
    event.replaceResponse(async () => {
        const originResponse = await fetch(event.request);
        const transformation = new TransformStream({
          flush(controller) {
            const encoder = new TextEncoder();
            const buf = encoder.encode(
              "<p>Served from a Netlify Edge Handler</p>");
            controller.enqueue(buf);
          },
        });

        const transformedBody = originResponse.body.pipeThrough(transformation);
        const headers = {
          'Content-Type': 'text/html'
        };

        return new Response(transformedBody, {
          headers
        });
  });
}

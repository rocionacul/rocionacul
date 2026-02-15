import React, { useEffect, useState } from 'react';
import './Playlist.css';

interface TumblrPost {
  id: number;
  post_url: string;
  type: string;
  summary?: string;
  photos?: Array<{
    original_size: {
      url: string;
    };
  }>;
  body?: string;
  caption?: string;
  title?: string;
  is_blocks_post_format?: boolean;
  content?: Array<{
    type: string;
    media?: Array<{
      type: string;
      url?: string;
    }>;
  }>;
  trail?: Array<{
    content?: Array<{
      type: string;
      media?: Array<{
        type: string;
        url?: string;
      }>;
    }> | string;
    content_raw?: string;
  }>;
}

interface TumblrResponse {
  response: {
    posts: TumblrPost[];
  };
}

declare global {
  interface Window {
    [key: string]: unknown;
  }
}

export const Playlist: React.FC = () => {
  const [posts, setPosts] = useState<TumblrPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Función para extraer URL de imagen del HTML
  const extractImageFromHTML = (html: string): string | null => {
    if (!html) return null;
    const imgMatch = html.match(/<img[^>]+src="([^">]+)"/);
    return imgMatch ? imgMatch[1] : null;
  };

  // Función para extraer la URL de imagen de un post (formato antiguo o nuevo)
  const getPostImageUrl = (post: TumblrPost): string | null => {
    // Formato antiguo: posts de tipo 'photo' con campo photos
    if (post.photos && post.photos.length > 0) {
      return post.photos[0].original_size.url;
    }

    // Formato nuevo: posts con bloques (is_blocks_post_format: true)
    if (post.is_blocks_post_format && post.content) {
      for (const block of post.content) {
        if (block.type === 'image' && block.media && block.media.length > 0) {
          return block.media[0].url || null;
        }
      }
    }

    // Formato de reblog trail (posts reblogueados con HTML)
    if (post.trail && post.trail.length > 0) {
      for (const trailItem of post.trail) {
        // Intentar extraer de content como HTML
        if (typeof trailItem.content === 'string') {
          const imgUrl = extractImageFromHTML(trailItem.content);
          if (imgUrl) return imgUrl;
        }
        // Intentar con content_raw
        if (trailItem.content_raw) {
          const imgUrl = extractImageFromHTML(trailItem.content_raw);
          if (imgUrl) return imgUrl;
        }
        // Formato estructurado de bloques en trail
        if (Array.isArray(trailItem.content)) {
          for (const block of trailItem.content) {
            if (block.type === 'image' && block.media && block.media.length > 0) {
              return block.media[0].url || null;
            }
          }
        }
      }
    }

    // Último recurso: buscar en el body HTML
    if (post.body) {
      const imgUrl = extractImageFromHTML(post.body);
      if (imgUrl) return imgUrl;
    }

    return null;
  };

  useEffect(() => {
    const fetchTumblrPosts = async () => {
      const apiKey = import.meta.env.VITE_TUMBLR_API_KEY;
      
      if (!apiKey) {
        console.error('Tumblr API key no configurada');
        setError(true);
        setLoading(false);
        return;
      }

      try {
        // Crear un callback único
        const callbackName = 'tumblrCallback' + Date.now();
        
        // Crear el script tag para JSONP
        const script = document.createElement('script');
        script.src = `https://api.tumblr.com/v2/blog/rocionacul.tumblr.com/posts?api_key=${apiKey}&limit=20&callback=${callbackName}`;
        
        // Crear el callback global
        window[callbackName] = (data: TumblrResponse) => {
          const allPosts = data.response.posts || [];
          
          // Filtrar posts que tienen imágenes usando la función helper
          const postsWithImages = allPosts.filter(post => {
            return !!getPostImageUrl(post);
          });

          setPosts(postsWithImages.slice(0, 6));
          setLoading(false);
          document.body.removeChild(script);
          delete window[callbackName];
        };

        // Manejar errores
        script.onerror = () => {
          console.error('Error loading Tumblr posts');
          setError(true);
          setLoading(false);
          document.body.removeChild(script);
          delete window[callbackName];
        };

        document.body.appendChild(script);
      } catch (err) {
        console.error('Error loading Tumblr posts:', err);
        setError(true);
        setLoading(false);
      }
    };

    fetchTumblrPosts();
  }, []);

  return (
    <section id="playlist" className="playlist section">
      <div className="container">
        <h2 className="section-title text-gradient-purple">Mas Inspo</h2>
        
        <p className="playlist-intro">
          Escucha la playlist del evento 🎵
        </p>

        <div className="playlist-buttons">
          <a 
            href="https://open.spotify.com/playlist/4FNhEau6QI8AJT3QmnatfK?si=78bb8c24b9bf438f" 
            target="_blank" 
            rel="noopener noreferrer"
            className="playlist-button spotify"
          >
            <svg className="playlist-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            <span>Escuchar en Spotify</span>
          </a>

          <a 
            href="https://music.apple.com/ar/playlist/ro-nacul-30s-vibe/pl.u-LdbqE7vC2vZaMVy?l=en-GB" 
            target="_blank" 
            rel="noopener noreferrer"
            className="playlist-button apple-music"
          >
            <svg className="playlist-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.997 6.124c0-.738-.065-1.47-.24-2.19-.317-1.31-1.062-2.31-2.18-3.043C21.003.517 20.373.285 19.7.164c-.517-.093-1.038-.135-1.564-.15-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208c-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03c.525 0 1.048-.007 1.572-.06.588-.06 1.174-.13 1.733-.329 1.267-.449 2.214-1.305 2.81-2.513.264-.533.398-1.1.472-1.686.043-.34.076-.68.09-1.023.01-.14.017-.283.027-.424V6.124zM19.098 3.15c.377.076.723.18 1.013.44.38.34.625.76.71 1.27.063.38.076.76.074 1.14l-.003 11.717c-.003.413-.024.825-.08 1.235-.09.658-.415 1.164-.975 1.482-.48.273-1.012.36-1.557.403-.485.038-.972.046-1.458.048H6.178c-.624 0-1.24-.03-1.85-.13-.548-.09-1.035-.28-1.425-.662-.36-.353-.575-.79-.67-1.278-.076-.39-.09-.785-.09-1.18V5.658c0-.655.03-1.307.237-1.94.197-.603.568-1.063 1.15-1.355.348-.175.718-.27 1.098-.333.42-.07.845-.09 1.27-.096.08-.003.16-.01.24-.013h11.064c.09.004.177.01.267.014.385.014.768.04 1.146.12z"/>
              <path d="M12.55 15.51c-.38 0-.757-.018-1.135-.06-.26-.028-.517-.084-.77-.16-.682-.205-1.17-.61-1.468-1.27-.203-.45-.263-.93-.21-1.418.063-.58.255-1.126.593-1.614.517-.748 1.214-1.305 2.022-1.732.43-.227.88-.414 1.34-.576.465-.163.938-.306 1.417-.43.552-.142 1.11-.265 1.67-.378.342-.07.687-.13 1.032-.19.26-.046.522-.084.785-.112.26-.028.523-.04.785-.05.24-.008.48.003.72.024.402.036.8.09 1.183.228.46.166.86.422 1.167.81.305.387.472.83.512 1.315.04.485-.015.963-.207 1.42-.303.722-.798 1.277-1.507 1.644-.566.293-1.173.425-1.803.484-.54.05-1.08.053-1.62.044-.424-.007-.847-.044-1.27-.087-.228-.023-.455-.056-.683-.087l.006 5.192c0 .41-.023.817-.122 1.216-.14.564-.412 1.043-.87 1.405-.417.33-.902.5-1.428.556-.56.06-1.117.054-1.673-.025-.582-.083-1.135-.258-1.644-.57-.544-.334-.93-.797-1.14-1.405-.15-.432-.196-.88-.196-1.33 0-.646.13-1.26.446-1.82.407-.72 1.003-1.2 1.78-1.468.697-.24 1.42-.326 2.153-.32.437.004.873.04 1.308.104.28.042.56.09.838.152.05.01.1.028.15.046v-2.586zm-4.01 3.905c0 .26.05.507.15.74.18.42.483.7.912.83.49.148.987.164 1.487.088.37-.056.698-.2.96-.48.23-.245.337-.544.378-.873.025-.197.037-.396.037-.594V17.78c-.023-.004-.038-.01-.053-.01-.56-.1-1.123-.18-1.693-.21-.627-.034-1.248.01-1.855.21-.537.176-.96.5-1.23 1-.21.388-.3.812-.295 1.247 0 .13.002.26.002.39zm8.238-6.21c-.03.007-.06.013-.09.02-.527.12-1.053.24-1.58.37-.555.14-1.103.294-1.645.47-.54.174-1.068.38-1.58.626-.423.203-.825.44-1.198.726-.373.286-.696.62-.96 1.01-.225.332-.39.69-.49 1.08-.09.35-.123.71-.095 1.07.03.382.14.742.36 1.063.258.376.606.644 1.04.79.405.137.822.18 1.246.18.374 0 .742-.04 1.103-.14.407-.112.778-.292 1.103-.56.335-.276.58-.625.714-1.04.094-.292.134-.593.14-.897.01-.415.006-.83.006-1.246V7.74c.01-.14.025-.28.045-.42.036-.247.11-.486.23-.71.137-.256.333-.46.585-.605.27-.156.565-.24.875-.274.474-.052.95-.054 1.425-.03.49.025.978.076 1.463.157.464.078.923.184 1.373.325.42.132.824.303 1.198.54.36.23.67.513.912.868.24.353.39.742.462 1.162.08.46.076.922-.01 1.38-.09.48-.282.917-.59 1.293-.315.383-.71.67-1.168.87-.51.222-1.04.356-1.587.424-.52.064-1.04.082-1.562.07-.473-.01-.945-.052-1.413-.13-.433-.072-.862-.172-1.285-.295-.04-.01-.078-.03-.117-.046-.01 0-.02.002-.03.004v2.434c.01 0 .018-.003.026-.003.035.01.07.02.106.028.405.09.812.172 1.223.235.51.078 1.023.13 1.538.158.54.03 1.08.024 1.62-.017.513-.04 1.02-.12 1.52-.254.49-.132.96-.31 1.404-.57.44-.257.825-.575 1.143-.975.313-.395.54-.833.672-1.314.138-.502.19-1.016.167-1.537-.024-.555-.14-1.09-.38-1.593-.258-.543-.64-.99-1.135-1.335-.51-.355-1.075-.594-1.674-.74-.623-.15-1.256-.225-1.894-.26-.623-.033-1.247-.022-1.87.017-.61.037-1.216.12-1.815.252-.593.13-1.178.293-1.755.483-.578.19-1.148.405-1.71.644-.55.234-1.09.49-1.62.77-.522.276-1.027.58-1.514.915-.472.324-.918.68-1.34 1.07-.41.378-.787.787-1.132 1.23-.345.444-.65.915-.915 1.415-.262.495-.477 1.007-.65 1.538-.168.515-.29 1.04-.368 1.575-.077.527-.114 1.06-.115 1.593 0 .555.05 1.106.166 1.65.122.567.305 1.11.567 1.625.272.535.612 1.028 1.027 1.47.427.455.918.84 1.47 1.14.568.31 1.175.525 1.81.657.653.135 1.316.193 1.984.193.668 0 1.333-.058 1.984-.193.635-.132 1.242-.347 1.81-.657.552-.3 1.043-.685 1.47-1.14.415-.442.755-.935 1.027-1.47.262-.515.445-1.058.567-1.625.116-.544.166-1.095.166-1.65V8.556c.01-.13.024-.26.04-.39.025-.188.06-.374.11-.557.088-.324.227-.627.428-.895.212-.283.473-.51.78-.68.314-.173.647-.287.994-.363.37-.082.744-.126 1.122-.148.424-.024.85-.018 1.274.01.433.03.863.09 1.287.19.41.096.813.22 1.204.38.382.157.743.35 1.078.59.33.237.62.516.867.84.248.324.437.68.567 1.064.14.41.21.833.226 1.265.015.418-.025.833-.125 1.24-.106.432-.29.832-.552 1.194-.272.377-.615.69-1.017.938-.417.256-.868.443-1.343.567-.492.128-1 .2-1.512.228-.502.028-1.004.022-1.506-.017-.48-.037-.957-.106-1.428-.21-.448-.1-.89-.225-1.325-.374-.042-.014-.084-.034-.126-.05-.01 0-.02.002-.03.004v2.434z"/>
            </svg>
            <span>Escuchar en Apple Music</span>
          </a>
        </div>

        <div className="tumblr-section">
          <h3 className="tumblr-title">Mas vibes del evento</h3>
          
          {loading && (
            <div className="tumblr-loading">
              <p>Cargando posts...</p>
            </div>
          )}

          {error && (
            <div className="tumblr-error">
              <p className="error-message">No se pudieron cargar los posts. Intenta recargar la pagina.</p>
            </div>
          )}

          {!loading && !error && posts.length > 0 && (
            <div className="tumblr-posts-grid">
              {posts.map((post) => {
                const imageUrl = getPostImageUrl(post);
                const caption = post.caption || post.summary || post.body || '';
                const cleanCaption = caption.replace(/<[^>]*>/g, '').trim();
                const truncatedCaption = cleanCaption.substring(0, 80);

                return (
                  <a 
                    key={post.id}
                    href={post.post_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tumblr-post-card"
                  >
                    {imageUrl && (
                      <div className="tumblr-post-image">
                        <img src={imageUrl} alt={truncatedCaption || 'Post'} loading="lazy" />
                      </div>
                    )}
                    {cleanCaption && truncatedCaption.length > 0 && (
                      <div className="tumblr-post-caption">
                        <p>{truncatedCaption}{cleanCaption.length > 80 ? '...' : ''}</p>
                      </div>
                    )}
                  </a>
                );
              })}
            </div>
          )}

          <div className="tumblr-link">
            <a href="https://rocionacul.tumblr.com" target="_blank" rel="noopener noreferrer">
              Ver mas en Tumblr →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

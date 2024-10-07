const parseEnv = () => {
        const rssVariables = Object.keys(process.env).filter(key => key.startsWith('RSS_'));

    rssVariables.forEach(key => {
      const value = process.env[key];
      console.log(`RSS_${key}=${value};`);
    }); 
};

parseEnv();

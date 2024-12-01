import packageJson from '../../package.json';
import themes from '../../themes.json';
import { history } from '../stores/history';
import { theme } from '../stores/theme';

const hostname = 'c2';

export const commands: Record<string, (args: string[]) => Promise<string> | string> = {
  help: () => 'Available commands: ' + Object.keys(commands).join(', '),
  hostname: () => hostname,
  whoami: () => 'Pedro Cunha',
  date: () => new Date().toLocaleString(),
  vi: () => `why use vi? try 'nano'`,
  vim: () => `why use vim? try 'nano'`,
  nano: () => `why use emacs? try 'vim'`,
  pwd: () => `/var/www/html`,
  echo: (args: string[]) => args.join(' '),
  sudo: (args: string[]) => {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    return `Permission denied: unable to run the command '${args[0]}' as root.`;
  },
  clear: () => {
    history.set([]);
    return '';
  },
  email: () => {
    window.open(`mailto:${packageJson.author.email}`);
    return `Opening mailto:${packageJson.author.email}...`;
  },
  weather: async (args: string[]) => {
    const city = args.join('+');
    if (!city) {
      return 'Usage: weather [city]. Example: weather Brussels';
    }

    const weather = await fetch(`https://wttr.in/${city}?ATm`);
    return weather.text();
  },
  exit: () => 'Please close the tab to exit.',
  curl: async (args: string[]) => {
    if (args.length === 0) {
      return 'curl: no URL provided';
    }

    const url = args[0];

    try {
      const response = await fetch(url);
      const data = await response.text();
      return data;
    } catch (error) {
      return `curl: could not fetch URL ${url}. Details: ${error}`;
    }
  },
  banner: () => `                                                                   
           __.                                                                                                  
        .-".'                      .--.            _..._                                            
      .' .'                     .'    \\       .-""  __ ""-.                                          
     /  /                     .'       : --..:__.-""  ""-. \\                                         
    :  :                     /         .d$$    sbp_.-""-:_:                                                 
    :   \\                    \\  T--...-: : d$b  :d$b                                                    
     \\   \`.                   \\  \`..'    $ $  $ $                                                 
      \`.   "-.                 ).        : T$P  :T$P                                                           
        \\..---^..             /           \`-'    \`._\`._                                                         
       .'        "-.       .-"                     T$$$b                                              
      /             "-._.-"               ._        '^'                                                       
     :                                    \\.\`         /                                   
     :                                -.   \\\`."-._.-'-'                                                   
    :                                 .'\   \\ \\ \\ \\                                   
    :  :                             /:  \\   \\ \\ .                                       
   :   :                            ,  ;  \`.  \`.;  :                                      
   ;    \\        ;                     ;    "-._:  ;                                             
  :      \`.      :                     :         \\/                                                   
  ;       /"-.    ;                    :                                        
 :       /    "-. :                  : ;                              
 :     .'        T-;                 ; ;        
 ;    :          ; ;                /  :          
 ;    ;          : :              .'    ;       
:    :            ;:         _..-"\\     :       
:     \\           : ;       /      \\     ;      
;    . '.         '-;      /        ;    :      
;  \\  ; :           :     :         :    '-.        
'.._L.:-'           :     ;          ;    . \`.             
                     ;    :          :  \\  ; :   
                     :    '-..       '.._L.:-'      
                      ;     , \`.                
                      :   \\  ; :                     
                      '..__L.:-'  
  
Type 'help' to see list of available commands.
  `
};

const PARAM = getParamUrl();

export function isEnabled(name) {    
    return window.location.hash.split('#').includes(name);
}

function getParamUrl() {
    return window.location.hash.split('#');
}

export function getParamFilter() {
    for(let i = 0; i < PARAM.length; i++) {        
        if(PARAM[i] == 'filter') {
            return PARAM[i];
        }
    }
}

export function getParamRenderBottom() {
    for(let i = 0; i < PARAM.length; i++) {
        if(PARAM[i] == 'renderBottom') {
            return PARAM[i];
        }
    }
}

export function getParamFilterTop () {
    for(let i = 0; i < PARAM.length; i++) {
        if(PARAM[i] == 'filterTop') {
            return PARAM[i];
        }
    }    
}
import ls from 'localstorage-slim';

export function isAuthenticated() {

    var user = ls.get('jl-ls-user', { decrypt: true });

    if( user) {
        return true;
    }
    else {
        return false;
    }
}
export function lsSetMenus(menus: any) {
    return ls.set('jl-ls-menus', menus, { encrypt: true });
}
export function lsGetMenus() {
    return ls.get('jl-ls-menus', { decrypt: true });
}
export function lsSetProject(project: any) {
    return ls.set('jl-ls-project', project, { encrypt: true });
}
export function lsGetProject() {
    return ls.get('jl-ls-project', { decrypt: true });
}
export function lsSetUser(user: any) {
    return ls.set('jl-ls-user', user, { encrypt: true });
}
export function lsGetUser() {
    return ls.get('jl-ls-user', { decrypt: true });
}
export function lsSetItem(key: string, value: any) {
    return ls.set(key, value, { encrypt: true });
}
export function lsGetItem(key: string) {
    return ls.get(key, { decrypt: true });
}
export function lsGetUserGroupName(project: any, group_refid: string) {
    var group_name  = group_refid;
    if(project?.user_group_list) {
        var user_group_list = project?.user_group_list;
        for(let i = 0; i < user_group_list.length; i++) {
            if(user_group_list[i]?.group_refid == group_refid) {
                group_name = user_group_list[i]?.name;
                break;
            }
        }
        return group_name;
    }
}
export function lsGetUserGroupList() {
    var project = lsGetProject() as any;
    if(project?.user_group_list) {
        return project?.user_group_list;
    }
}

export function geoPHRegionName(code: string) {
    var project = lsGetProject() as any;
    if(project?.geo_ph_region) {
        var region = project?.geo_ph_region;
        for(let i = 0; i < region.length; i++) {
            if(region[i]['regCode'] == code) {
                return region[i]['regDesc'];
            }
        }
    }
    else {
        return code;
    }
}

export function geoPHProvinceName(code: string) {
    var project = lsGetProject() as any;
    if(project?.geo_ph_province) {
        var province = project?.geo_ph_province;
        for(let i = 0; i < province.length; i++) {
            if(province[i]['provCode'] == code) {
                return province[i]['provDesc'];
            }
        }
    }
    else {
        return code;
    }
}

export function geoPHCityName(code: string) {
    var project = lsGetProject() as any;
    if(project?.geo_ph_cities) {
        var cities = project?.geo_ph_cities;
        for(let i = 0; i < cities.length; i++) {
            if(cities[i]['citymunCode'] == code) {
                return cities[i]['citymunDesc'];
            }
        }
    }
    else {
        return code;
    }
}
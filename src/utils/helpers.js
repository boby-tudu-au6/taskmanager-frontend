export function getInitials(name){
    let initials = '';
    const namearr = name.split(' ');
    namearr.forEach(item => {
        initials = initials + item[0];
    });
    return initials;
}
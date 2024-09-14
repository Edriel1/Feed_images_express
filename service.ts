export function services<T extends new (...args: any[]) => any>(target: T) {

let started: InstanceType<T>;

return class extends target {
    constructor(...args: any[]) {
        if(!started){
            super();
            started = new target(...args);}

      return started;
}
}
}
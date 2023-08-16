import _ from 'lodash';

function paginate(items,pageSize,pageNumber){
let startIdx=(pageNumber-1)*pageSize;
return _(items).slice(startIdx).take(pageSize).value();

};

export default paginate;


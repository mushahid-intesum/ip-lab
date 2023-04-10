import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Selection, Search, Toolbar, CommandColumn, Edit, Sort, Filter} from '@syncfusion/ej2-react-grids';
import { customersData, customersGrid} from '../data/dummy';

import { Header } from '../components';

const Project = () => {
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Management" title= "Projects" />
      <GridComponent
        dataSource={customersData}
        allowPaging
        allowSorting
        toolbar={['Search', "Delete", "Add"]}
        editSettings={{allowDeleting:true, allowEditing:true, allowAdding:true}}
        width="auto"
      >
        <ColumnsDirective>

          {customersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        
        </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar, Selection, Edit, Sort, CommandColumn, Filter]} />
      </GridComponent>
    </div>
  )
}

export default Project;

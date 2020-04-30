import React from 'react'
import Sortable from "react-sortablejs";

import { Colxx } from "../../components/common/CustomBootstrap";
import RadialProgressCard from "../../components/cards/RadialProgressCard";


const SortableStaticticsRow = ({messages, complete, pending, online,offline}) => {
  console.log("pppppppppppp",complete,pending,online,offline)
  return (
    <Sortable options={{handle: ".handle"}} className="row">
    <Colxx xl="3" lg="6" className="mb-4">
      <RadialProgressCard
        title={messages["dashboards.completed-tasks"]}
        percent={complete}
        // isSortable={true}
      />
    </Colxx>
    <Colxx xl="3" lg="6" className="mb-4">
      <RadialProgressCard
        title={messages["dashboards.remaining-task"]}
        percent={pending}
        // isSortable={true}
      />
    </Colxx>
    <Colxx xl="3" lg="6" className="mb-4">
      <RadialProgressCard
        title={messages["dashboards.offline-device"]}
        percent={offline}
        // isSortable={true}
      />
    </Colxx>
    <Colxx xl="3" lg="6" className="mb-4">
      <RadialProgressCard
        title={messages["dashboards.online-device"]}
        percent={online}
        // isSortable={true}
      />
    </Colxx>
  </Sortable>
  
  )
}
export default SortableStaticticsRow

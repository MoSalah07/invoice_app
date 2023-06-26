import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import EditContentItemList from "./EditContentItemList";
import { auth } from "../../../configFirebase/configFirebase";
import EditNewContentList from "./EditNewContentList";

function EditItemList({
  updateItem,
  setIsDone,
  isDone,
  getDataFromEditContentItemList,
}) {
  const [createList, setCreateList] = useState([]);


  // const [itemContentList, setItemContentList] = useState( {} );

  const { itemListContent } = updateItem;




  const handelBtnAddItem = (e) => {
    e.preventDefault();
    setCreateList((prev) => [
      ...prev,
      { id: Math.trunc(Math.random() * 100000000)},
    ]);
  };



  useEffect(() => {
    if (!auth?.currentUser || updateItem.length === 0) return;
    setCreateList(itemListContent);
  }, [auth?.currentUser, updateItem]);


  /*
  useEffect(() => {
    setCreateNewItemList( createList );
  }, [createList])

*/
  
  
  const deleteAddNewItem = (id) => {
    const deleteItem = createList?.filter((item) => item.id !== id);
    setCreateList(deleteItem);
    // console.log(deleteItem)
  };

  /*
  const deleteSecondNewItem = (id) => {
    const deleteItem = createNewItemList?.filter((item) => item.id !== id);
    setCreateNewItemList( deleteItem );
    console.log('hi')
    // console.log(deleteItem)
  };
*/


  // console.log( dataFromListtContent );


  const renderContentItemList = createList?.map((item) => {
    return (
      <EditContentItemList
        deleteAddNewItem={() => deleteAddNewItem(item?.id)}
        key={item?.id || Math.trunc(Math.random() * 100000000)}
        id={item?.id || Math.trunc(Math.random() * 100000000)}
        item={item}
        getDataFromEditContentItemList={getDataFromEditContentItemList}
        isDone={isDone}
        setCreateList={setCreateList}
      />
    );
  } );
  
// console.log(dataFromNewItemList)
  
  // new
  // const renderNewContentItemList = createNewItemList?.map((element) => {
  //   return (
  //     <EditNewContentList
  //       key={element.id}
  //       id={element.id}
  //       deleteSecondNewItem={() => deleteSecondNewItem( element.id )}
  //       isDone={isDone}
  //       element={element}
  //     />
  //   );
  // });



  return (
    <div className="edit-item-list">
      <div className="item-list">
        <h3 className="title-item-list">ItemList</h3>

        <div onClick={handelBtnAddItem} className="add-new-item">
          <BiPlus />
          <button onClick={(e) => e.preventDefault()}>add new item</button>
        </div>
        <div className="container-box-item-list">
          {renderContentItemList}
          {/* {renderNewContentItemList} */}
        </div>
      </div>
    </div>
  );
}

export default EditItemList;

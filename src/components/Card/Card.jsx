import {
  Tr, Td, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
} from '@chakra-ui/react'
import ModalEntry from '../ModalEntry/ModalEntry'
import { useState, useEffect, useRef } from 'react'
import { deleteDataFromDb, updateDataInDb } from '../../api/calls'
import buildObjectFromForm from '../../utils/utils'

const Card = ({ data, columns, type }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [updatedData, setUpdatedData] = useState(data)
  const isInitialRender = useRef(true)

  const createArrayOfSummaryValues = (summaryFields, dataObject) =>
    summaryFields.map(key => key.id)
      .reduce((result, field) => {
        result.push({ [field]: dataObject[field] });
        return result;
      }, [])
      .map(obj => Object.values(obj))

  const summaryValues = createArrayOfSummaryValues(columns, data)

  useEffect(() => {
    if (!isInitialRender.current) { // ensure updateDataInDb() doesn't trigger an infinite loop
      updateDataInDb(updatedData, type)
    }
  }, [updatedData])

  const handleUpdateFormSubmit = (e) => {
    e.preventDefault();
    isInitialRender.current = false
    const fields = Array.from(e.target.elements).map(element => element.id)
    const responses = Array.from(e.target.elements).map(element => element.value)
    const fieldsAndResponsesAsObject = buildObjectFromForm(fields, responses)
    const newData = Object.fromEntries(
      Object.entries(fieldsAndResponsesAsObject).filter(([key, value]) => value !== '')
    )
    setUpdatedData({ ...newData, _id: data._id })
    onClose()
  }

  const deleteData = () => {
    const parentid = ((data._site) ? data._site : undefined)
    deleteDataFromDb(type, data._id, parentid)
  }

  return (
    <Tr className="card">
      {/* Key information for each entry */}
      {summaryValues.map((value, index) => <Td key={index}>{value}</Td>)}
      <Td w="100px" p="10px">

        {/* Edit button and modal that displays when it is opened */}
        <Button onClick={onOpen}>Edit</Button>
        <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit {data._id}</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={(e) => handleUpdateFormSubmit(e)} id="update-data-form">
              <ModalBody>
                <ModalEntry data={data} />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button variant='ghost' type="submit">Update</Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </Td>
      {/* Delete button for each entry*/}
      <Td w="100px" p="10px">
        <Button color="red" onClick={deleteData}>Delete</Button>
      </Td>
    </Tr >
  )
}

export default Card
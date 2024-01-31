'use client'
import React, {
  ChangeEvent,
  MouseEventHandler,
  KeyboardEvent,
  useState
} from 'react'
import {Input} from '@nextui-org/input'
import {Chip} from '@nextui-org/chip'
import {IoAdd} from 'react-icons/io5'
const handleInputOnChange = (
  setter: (s: string) => void
) => (e: ChangeEvent<HTMLInputElement>) => {
  setter(e.currentTarget.value)
}

const processInputValueAndDedupe = (
  currentTags: Set<string>,
  inputValue: string
) => {
  const inputValues = inputValue
    .split(',')
    .reduce(
      (acc: string[], s: string): string[] => {
        const trimmed = s.trim()
        return trimmed !== '' ?
          [
            ...acc,
            trimmed
          ] : acc
      }, []
    )

  return new Set([...currentTags, ...inputValues])
}

const setTagsAndClearInput = (
  currentTags: Set<string>,
  setTags: (tags: Set<string>) => void,
  inputValue: string,
  setInputValue: (s: string) => void
) => {
  setTags(
    processInputValueAndDedupe(currentTags, inputValue)
  )
  setInputValue('')
}

const handleSubmitTags = (
  currentTags: Set<string>,
  setTags: (tags: Set<string>) => void,
  inputValue: string,
  setInputValue: (s: string) => void
) => () => setTagsAndClearInput(
    currentTags,
    setTags,
    inputValue,
    setInputValue
  )

const handleTagClear = (
  clearTag: string,
  tags: Set<string>,
  setTags: (tags: Set<string>) => void
) => () => {
  tags.delete(clearTag)
  setTags(new Set([...tags]))
}

interface TagsInputProps {
  label: string,
  placeholder: string,
  description: string,
  tags: Set<string>,
  setTags: (t: Set<string>) => void
}

const handleOnKeyUp = (
  currentTags: Set<string>,
  setTags: (tags: Set<string>) => void,
  inputValue: string,
  setInputValue: (s: string) => void
) => (e: React.KeyboardEvent<HTMLInputElement>) => {
  if(e.key === 'Enter') {
    e.preventDefault()
    setTagsAndClearInput(
      currentTags,
      setTags,
      inputValue,
      setInputValue
    )
  }
}
const TagsInput = ({
  label,
  placeholder,
  description,
  tags,
  setTags
}: TagsInputProps) => {
  const [inputValue, setInputValue] = useState<string>('')

  return <>
    <Input
      onChange={handleInputOnChange(setInputValue)}
      onKeyPress={handleOnKeyUp(
        tags,
        setTags,
        inputValue,
        setInputValue,
      )}
      value={inputValue}
      label={label}
      placeholder={placeholder}
      description={description}
      endContent={
        <IoAdd
            onClick={handleSubmitTags(
            tags,
            setTags,
            inputValue,
            setInputValue,
          )}
          className="cursor-pointer"/>
      }
    ></Input>
    <div className="flex gap-4">
      {
        tags && [...tags].map(
          tag => <Chip
            key={tag}
            onClose={handleTagClear(
              tag,
              tags,
              setTags
            )}>{tag}</Chip>
        )
      }
    </div>
  </>
}

export default TagsInput

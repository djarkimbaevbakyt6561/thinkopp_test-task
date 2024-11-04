'use client';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Input, Button, Dropdown, TextArea } from '../ui';
import { ArrowIcon } from '@/assets/icons';
import { countries, formats, genres } from '@/lib/consts/consts';
import ReactPaginate from 'react-paginate';
import './Form.scss';

type FormValues = {
  projectName: string;
  genre: string;
  format: string;
  UNF: string;
  country: string;
  estimatedСost: number;
  synopsis: string;
};

export default function Form() {
  const methods = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      projectName: '',
      genre: '',
      format: '',
      UNF: '',
      country: '',
      estimatedСost: 0,
      synopsis: '',
    },
  });

  const {
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { isValid },
  } = methods;

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  const valueChangeHandler = (name: string, value: string) => {
    setValue(name as keyof FormValues, value);
    trigger(name as keyof FormValues);
  };
  const formatUNF = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 14);

    return digits.replace(
      /(\d{1,3})(\d{1,3})?(\d{1,3})?(\d{1,2})?(\d{1,3})?/,
      (match, p1, p2, p3, p4, p5) => {
        return [p1, p2, p3, p4, p5].filter(Boolean).join('-');
      }
    );
  };

  return (
    <FormProvider {...methods}>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form_title__container">
          <h1>Производственные параметры фильма</h1>
          <Button>Отменить выполнение</Button>
        </div>
        <div className="form_main_input__container">
          <div className="form_first_input__container">
            <div className="form_input__container">
              <Input
                name="projectName"
                validation={{
                  required: 'Заполнить поле',
                }}
                label="Название проекта"
                type="text"
                placeholder="Название"
              />
              <Dropdown
                value={watch('genre')}
                name="genre"
                validation={{
                  required: 'Заполнить поле',
                }}
                label="Жанр"
                options={genres}
                placeholder="Жанр"
                setInputValue={valueChangeHandler}
              />
              <Dropdown
                value={watch('format')}
                name="format"
                validation={{
                  required: 'Заполнить поле',
                }}
                label="Формат (для онлайн-платформ, большого экрана, интернета, другое)"
                options={formats}
                placeholder="Формат"
                setInputValue={valueChangeHandler}
              />
            </div>
            <Input
              name="UNF"
              validation={{
                required: 'Заполнить поле',
                pattern: {
                  value: /^\d{3}-\d{3}-\d{3}-\d{2}-\d{3}$/,
                  message: 'Неверный формат',
                },
              }}
              label="№ УНФ или отсутствует"
              type="text"
              placeholder="890-000-000-00-000"
              value={watch('UNF')}
              onChange={(e) => {
                const formattedValue = formatUNF(e.target.value);
                setValue('UNF', formattedValue);
                trigger('UNF');
              }}
            />
          </div>
          <div className="form_second_input__container">
            <Dropdown
              value={watch('country')}
              name="country"
              validation={{
                required: 'Заполнить поле',
              }}
              label="Страна-производитель (копродукция)"
              options={countries}
              placeholder="Страна"
              setInputValue={valueChangeHandler}
            />
            <Input
              name="estimatedCost"
              label="Сведения о сметной стоимости производства фильма на территории Нижегородской области, если есть"
              type="number"
              placeholder="Сметная стоимость"
            />
            <TextArea
              name="synopsis"
              label="Синопсис"
              placeholder="Напишите краткое изложение"
            />
          </div>
        </div>
        <div className="form_next_step__container">
          <ReactPaginate
            className="pagination"
            breakLabel="..."
            nextLabel={<ArrowIcon />}
            pageRangeDisplayed={4}
            pageCount={4}
            previousLabel={<ArrowIcon />}
            renderOnZeroPageCount={null}
          />
          <Button
            disabled={!isValid}
            type="submit"
            className="form__submit_button"
            Icon={ArrowIcon}
          >
            Следующий шаг
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

const dynamicTranslate = (key) => ({
  getTranslatedValue: () => translate(key),
});

const makeDynamicTranslations = (target) => {
  const handler = {
    get(target, prop) {
      const value = target[prop];

      if (typeof value === 'object' && value !== null) {
        return new Proxy(makeDynamicTranslations(value), handler);
      }

      if (value?.getTranslatedValue) {
        return value.getTranslatedValue();
      }

      return value;
    },
  };

  return new Proxy(target, handler);
};

function tran({ makeDynamicTranslations, dynamicTranslate }, changeLanguage) {
  const object = makeDynamicTranslations({
    key: dynamicTranslate('key'),
    key2: dynamicTranslate('key2'),
  });

  changeLanguage('ru');
  const objectRu = JSON.stringify(object);

  changeLanguage('en');
  const objectEn = JSON.stringify(object);

  const test = String(
    makeDynamicTranslations({ key: dynamicTranslate('key') }).key
  );

  return {
    ru: JSON.parse(objectRu),
    en: JSON.parse(objectEn),
    test,
  };
}

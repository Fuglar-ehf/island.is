// ---------------------------------------------------------------------------

export type RegulationHomeTexts = Partial<
  Record<
    | 'homeIntroLegend' // 'Reglugerðasafn'
    | 'homeIntro' // 'Eitthvað hressandi um reglugerðir og fleira skemmtilegt og fræðandi.'
    | 'homeIntroShowDetails' // 'Sjá nánar um safnið og fyrirvara'
    | 'homeIntroImageUrl' // 'https://placekitten.com/400/400'
    | 'homeIntroImageThumbnailUrl' // 'https://placekitten.com/50/50'
    | 'homeNewestRegulations' // 'Nýjustu reglugerðirnar'
    | 'defaultRegulationListsLegend' // 'Nýlegar reglugerðir'
    | 'searchResultsLegend' // 'Leitarniðurstöður'
    | 'searchResultCountZero' // 'Engar reglugerðir fundust fyrir þessi leitarskilyrði.'
    | 'searchResultCountPlural' // '${count} reglugerðir fundust'
    | 'searchResultCountSingular' // '${count} reglugerð fannst'
    | 'regTypeBase' // 'Stofnreglugerð'
    | 'regTypeAmending' // 'Breytingareglugerð'
    | 'searchTitleLabel' // 'Leita að reglugerðum'
    | 'searchClearLabel' // 'Núllstilla leit'
    | 'searchResultLabel' // 'Sýna niðurstöður'
    | 'searchQueryLabel' // 'Leitarorð'
    | 'searchYearLabel' // 'Útgáfuár'
    | 'searchYearPlaceholder' // 'Veldu útgáfuár'
    | 'searchYearEmptyOption' // 'Öll ár'
    | 'searchChapterLabel' // 'Lagasafn'
    | 'searchChapterPlaceholder' // 'Kafli í Lagasafni'
    | 'searchChapterEmptyOption' // 'Allir kaflar'
    | 'searchMinistryLabel' // 'Ráðuneyti'
    | 'searchMinistryPlaceholder' // 'Veldu ráðuneyti'
    | 'searchMinistryEmptyOption' // 'Öll ráðuneyti'
    | 'searchLegacyMinistrySuffix' // '(fyrrverandi ráðuneyti)'
    | 'searchIncludeAmendingLabel', // 'Leita líka í breytingareglugerðum'
    string
  >
>

// ===========================================================================
// ===========================================================================

export type RegulationPageTexts = Partial<
  Record<
    | 'goBack' // 'Til baka'
    | 'printThisVersion' // 'Prenta þessa útgáfu'
    | 'copyPermaLink' // "Afrita hlekk á þessa útgáfu"
    | 'redirectText' // 'Þessi reglugerð er enn sem komið er hýst á eldri vefslóð:'
    | 'showDiff' // 'Sýna breytingar'
    | 'hideDiff' // 'Fela breytingar'
    | 'regTypeBase' // 'Stofnreglugerð'
    | 'regTypeAmending' // 'Breytingareglugerð'
    | 'appendixesTitle' // 'Viðaukar'
    | 'appendixGenericTitle' // 'Viðauki'
    | 'commentsTitle' // 'Athugasemdir ritstjóra'
    | 'ministryTransfer' // 'Nýr ábyrgðaraðili: ${ministry} (var fyrir ${prevMinistry})'
    | 'affectingLinkPrefix' // 'Breytingar vegna'
    | 'affectingListLegend' // 'Reglugerðir sem kveða á um þessar breytingar'
    | 'effectsTitle' // 'Áhrif ${name} á aðrar reglugerðir'
    | 'effectsChange' // 'Breytir ${name}'
    | 'effectsCancel' // 'Fellir brott ${name}'
    | 'historyTitle' // 'Breytingasaga reglugerðar ${name}'
    | 'historyStart' // 'Stofnreglugerð tók gildi'
    | 'historyStartAmending' // 'Reglugerðin tók gildi'
    | 'historyChange' // 'Breytt af ${name}'
    | 'historyCancel' // 'Brottfelld af ${name}'
    | 'historyCurrentVersion' // 'Núgildandi útgáfa'
    | 'historyPastSplitter' // 'Gildandi breytingar'
    | 'historyFutureSplitter' // 'Væntanlegar breytingar'
    | 'infoboxTitle' // 'Upplýsingar'
    | 'infoboxMinistry' // 'Ráðuneyti'
    | 'infoboxLawChapters' // 'Lagakaflar'
    | 'infoboxEffectiveDate' // 'Tók gildi'
    | 'infoboxLastAmended' // 'Síðast breytt'
    | 'infoboxRepealed' // 'Féll úr gildi'
    | 'viewAffectingRegulation', // 'Skoða ${title}'
    string
  >
>

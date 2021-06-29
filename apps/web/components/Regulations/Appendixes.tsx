import * as s from './RegulationDisplay.treat'

import React, { memo } from 'react'
import { HTMLText, PlainText, useDomid } from '@island.is/regulations'
import { RegulationMaybeDiff } from '@island.is/regulations/web'
import { Accordion, AccordionItem, Box, Text } from '@island.is/island-ui/core'
import { HTMLBox } from '@island.is/regulations/react'

const hasDiff = (text: string) => /<(del|ins)/.test(text)

const getSafeTitle = (title: string) =>
  hasDiff(title)
    ? {
        asPlainText: undefined,
        asHtml: title as HTMLText,
      }
    : {
        asPlainText: title
          .replace(/&gt;/g, '>')
          .replace(/&lt;/g, '<') as PlainText,
        asHtml: undefined,
      }

// ---------------------------------------------------------------------------

export type AppendixesProps = {
  legend: string
  genericTitle: string
  appendixes: ReadonlyArray<RegulationMaybeDiff['appendixes'][0]>
}

export const Appendixes = memo((props: AppendixesProps) => {
  const { appendixes } = props
  const domid = useDomid()

  if (!appendixes.length) {
    return null
  }

  return (
    <Box marginTop={[6, 10]} marginBottom={[6, 6]} aria-label={props.legend}>
      <Accordion singleExpand={false}>
        {appendixes.map((appendix, i) => {
          const id = 'appendix' + i + domid
          const title = getSafeTitle(appendix.title)

          return (
            appendix.text && (
              <AccordionItem
                key={id}
                id={id}
                labelVariant="h3"
                labelUse="h2"
                label={title.asPlainText || ''}
                visibleContent={
                  title.asHtml && (
                    // NOTE: This horrible hack is because AccordionItem's label can't be JSX.Element/ReactNode
                    <Text variant="h3" as="h2">
                      <HTMLBox
                        component="span"
                        className={s.bodyText}
                        html={title.asHtml}
                      />
                    </Text>
                  )
                }
                startExpanded={hasDiff(appendix.text)}
              >
                <HTMLBox className={s.bodyText} html={appendix.text} />
              </AccordionItem>
            )
          )
        })}
      </Accordion>
    </Box>
  )
})
